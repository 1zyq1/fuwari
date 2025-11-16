// 自动初始化（推荐）
// 播放器会在 DOM 加载完成后自动初始化

// 手动初始化
document.addEventListener("DOMContentLoaded", () => {
	const players = document.querySelectorAll(".netease-mini-player");
	players.forEach((playerElement) => {
		new NeteaseMiniPlayer(playerElement);
	});
});

// 单个播放器初始化
const playerElement = document.querySelector("#my-player");
const _player = new NeteaseMiniPlayer(playerElement);
