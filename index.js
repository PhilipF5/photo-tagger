const { app, BrowserWindow } = require("electron");
const { version } = require("./package.json");

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1366,
		height: 768,
		useContentSize: true,
		resizable: true,
		title: `Photo Tagger v${version}`,
		webPreferences: {
			nodeIntegration: true,
		},
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
