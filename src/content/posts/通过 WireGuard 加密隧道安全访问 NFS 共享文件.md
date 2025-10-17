---
title: 通过 WireGuard 加密隧道安全访问 NFS 共享文件
published: 2025-10-08T17:15:00.000Z
updated: 2025-10-08T17:15:00.000Z
tags:
  - NFS
  - WireGuard
  - VPS
  - 网络存储
  - 系统运维
  - Linux
description: 本文详细介绍如何利用 WireGuard 构建加密隧道，安全地在两台 VPS 之间挂载 NFS 共享文件系统，实现低成本、高性能的存储扩展。
image: /src/assets/images/wireguard.webp
draft: false
---


当 VPS 的硬盘空间告急时，相比于直接升级扩容，在活动期间另购一台大硬盘的 VPS 通常是更具性价比的数据存储方案。

对于跨地域的文件挂载，我通常选择 **WebDAV over HTTPS** 配合 **Rclone** 的方式。然而，若两台服务器位于同一地域，为了追求更高的传输速度和更低的性能开销，**NFS (Network File System)** 无疑是更佳的选择。但 NFS 协议本身不提供加密，若在公网或互通的机房内网中使用，存在安全风险。常见的加密方案包括 NFS over TLS 或 Kerberos，而本文将介绍另一种简洁有效的方法：利用 **WireGuard** 协议为 NFS 流量构建一个加密隧道。

> **重要提示**：WireGuard 使用 UDP 协议传输数据。部分服务商可能会对 UDP 流量进行 QoS 限速，从而影响体验。建议在部署前使用 `iperf3` 测试两台 VPS 间的 UDP 带宽，确保服务商未做限制。

## 场景概述

假设我们有两台 VPS：

- **VPS A (服务端)**：拥有大容量硬盘，用于存储数据，并作为 NFS 服务端与 WireGuard 服务端。
- **VPS B (客户端)**：硬盘空间较小，作为 NFS 客户端与 WireGuard 客户端，通过隧道挂载 VPS A 的共享目录。

以下操作基于 **Debian 12** 系统，并默认使用 `root` 用户权限。

## 第一部分：配置 WireGuard 加密隧道

## 1. 安装 WireGuard

在 **VPS A** 和 **VPS B** 上分别执行以下命令，安装 WireGuard：

```bash
apt update && apt install wireguard -y
```

## 2. 生成密钥对
在两台 VPS 上分别生成各自的公私钥对：
```bash
umask 077
wg genkey | tee /etc/wireguard/private.key | wg pubkey > /etc/wireguard/public.key
# 执行完毕后恢复默认 umask
umask 022
```
## 3. 配置 WireGuard 隧道
我们选择 10.0.1.0/24 作为 WireGuard 的内网网段。VPS A 的 IP 设为 10.0.1.1，VPS B 的 IP 设为 10.0.1.2。

a. 配置 VPS A (服务端)

编辑配置文件 /etc/wireguard/wg0.conf：
```bash
ini
[Interface]
Address = 10.0.1.1/24
ListenPort = 51820
PrivateKey = <VPS_A_PRIVATE_KEY> # 填入 VPS A 的私钥

[Peer]
PublicKey = <VPS_B_PUBLIC_KEY>   # 填入 VPS B 的公钥
AllowedIPs = 10.0.1.2/32
```
b. 配置 VPS B (客户端)

编辑配置文件 /etc/wireguard/wg0.conf：
```bash
ini
[Interface]
Address = 10.0.1.2/24
PrivateKey = <VPS_B_PRIVATE_KEY> # 填入 VPS B 的私钥

[Peer]
PublicKey = <VPS_A_PUBLIC_KEY>   # 填入 VPS A 的公钥
Endpoint = <VPS_A_PUBLIC_IP>:51820 # 替换为 VPS A 的公网 IP
AllowedIPs = 10.0.1.1/32
```
## 4. 启动并验证隧道
a. 启动服务

在两台 VPS 上分别启动并启用 WireGuard 服务：

```bash
systemctl enable --now wg-quick@wg0
systemctl status wg-quick@wg0 # 检查服务状态
```
b. 验证连接

使用 wg show 命令查看隧道状态。如果看到对端有最新的握手时间 (latest handshake) 和流量统计，说明隧道已成功建立。

```bash
wg show
```
此外，可以尝试互相 Ping 对方的 WireGuard IP：

```bash
# 在 VPS A 上执行
ping 10.0.1.2

# 在 VPS B 上执行
ping 10.0.1.1
```
c. 安全加固

隧道建立后，建议删除本地的私钥文件，因为它已被配置文件引用：

```bash
rm /etc/wireguard/private.key
d. 防火墙配置

如果 VPS A 启用了防火墙 (如 ufw)，需要放行 WireGuard 端口：

ufw allow from <VPS_B_PUBLIC_IP> to any port 51820 comment 'WireGuard for NFS'
```
## 第二部分：配置 NFS 文件共享
1. NFS 服务端配置 (VPS A)
a. 安装 NFS 服务端软件

```bash
apt install nfs-kernel-server -y
```
b. 创建并配置共享目录

假设我们要共享的目录是 /mnt/data/share。

```bash
mkdir -p /mnt/data/share
编辑 NFS 导出配置文件 /etc/exports，添加以下行：


/mnt/data/share 10.0.1.2(rw,sync,no_subtree_check,no_root_squash)
参数解释：

rw: 客户端拥有读写权限

sync: 同步写入，保证数据一致性，比 async 更安全

no_subtree_check: 禁用子目录检查，可提高性能并避免某些权限错误

no_root_squash: 不压缩客户端 root 用户的权限。在完全信任的环境中使用，默认行为 (root_squash) 会将客户端 root 映射为服务端的匿名用户，更安全但可能需要复杂的权限设置

应用导出配置：
exportfs -ra
```
