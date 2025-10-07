import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "HI I'm 1zyq1",
	subtitle: "你好 我叫1zyq1",
	lang: "zh_CN", // 语言代码，例如 'en', 'zh_CN', 'ja' 等
	themeColor: {
		hue: 250, // 主题颜色的默认色调，范围从0到360。例如红色: 0, 蓝绿色: 200, 青色: 250, 粉色: 345
		fixed: false, // 对访客隐藏主题颜色选择器
	},
	banner: {
		enable: true,
		src: "https://t.alcy.cc/ycy", // 相对于 /src 目录的路径。如果以 '/' 开头，则相对于 /public 目录
		position: "center", // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'
		credit: {
			enable: false, // 显示横幅图片的署名文本
			text: "", // 要显示的署名文本
			url: "", // (可选) 指向原始作品或艺术家页面的URL链接
		},
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 2, // 目录中显示的最大标题深度，从1到3
	},
	favicon: [
		// 保留此数组为空以使用默认favicon
		// {
		//   src: '/favicon/icon.png',    // favicon的路径，相对于 /public 目录
		//   theme: 'light',              // (可选) 'light' 或 'dark'，仅当您为浅色和深色模式设置了不同的favicon时设置
		//   sizes: '32x32',              // (可选) favicon的尺寸，仅当您有不同尺寸的favicon时设置
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "GitHub",
			url: "https://github.com/1zyq1", // 内部链接不应包含基础路径，因为它会自动添加
			external: true, // 显示外部链接图标，并在新标签页中打开
		},
		{
			name: "Openlist",
			url: "https://openlist.1zyq1.top", // 内部链接不应包含基础路径，因为它会自动添加
			external: true, // 显示外部链接图标，并在新标签页中打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://q1.qlogo.cn/g?b=qq&nk=2289308183&s=640", // 相对于 /src 目录的路径。如果以 '/' 开头，则相对于 /public 目录
	name: "1zyq1",
	bio: "Protect What You Love./爱你所爱！",
	links: [
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://store.steampowered.com",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/1zyq1",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（例如背景颜色）正在被覆盖，请参阅 astro.config.mjs 文件。
	// 请选择一个深色主题，因为此博客主题目前仅支持深色背景颜色
	theme: "github-dark",
};