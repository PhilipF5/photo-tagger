const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1024,
		height: 768,
		useContentSize: true,
		resizable: false,
	});

	win.loadFile(`build/index.html`);

	win.on("closed", function() {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
	app.quit();
});

app.on("activate", function() {
	if (win === null) {
		createWindow();
	}
});
