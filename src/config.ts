import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "1zyq1 Blog",
	subtitle: "1zyq1 博客",
	lang: "zh_CN",
	themeColor: {
		hue: 360,
		fixed: false,
	},
	banner: {
		enable: false,
		src: "https://t.alcy.cc/ycy",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	// 添加背景配置
	background: {
		enable: true, // 启用背景图片
		src: "https://t.alcy.cc/ycy", // 背景图片URL
		position: "center", // 背景位置
		size: "cover", // 背景大小
		repeat: "no-repeat", // 背景重复
		attachment: "fixed", // 背景附着
        opacity: 0.85, // 85% 不透明，背景清晰但仍有层次感
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "Bangumi",
			url: "/bangumi/",
			external: false,
		},
		{
			name: "友链",
			url: "/friends/",
			external: false,
		},
		{
			name: "赞助",
			url: "/donate/",
			external: false,
		},
		{
			name: "Openlist",
			url: "https://openlist.1zyq1.top",
			external: true,
		},
		{
			name: "统计",
			url: "https://umami.1zyq1.top/share/u2GksI6shcbEnv64/www.1zyq1.top",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://q1.qlogo.cn/g?b=qq&nk=2289308183&s=640",
	name: "1zyq1",
	bio: "Protect What You Love./爱你所爱！",
	links: [
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
	theme: "github-dark",
};
