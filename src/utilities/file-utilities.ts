import fs from "fs";
import path from "path";
const _fs: typeof fs.promises = window.require("fs").promises;
const _path: typeof path = window.require("path");
const {
	remote: { dialog },
} = window.require("electron");

const excludedExts = [".xmp", ".db", ".mp4"];
export const pageSize = 100;

export async function exportTagsToFile(tags: string[]) {
	const { filePath } = await dialog.showSaveDialog();
	return saveFile(filePath, JSON.stringify(tags, undefined, 4));
}

export async function importTagsFromFile() {
	const {
		filePaths: [filePath],
	} = await dialog.showOpenDialog({ filters: [{ extensions: [".json"] }] });

	return filePath ? JSON.parse((await loadFile(filePath)).content) : null;
}

export async function loadImages(fileNames: string[], page: number) {
	return Promise.all(getPageOfFiles(fileNames, page).map((fileName) => loadFile(fileName, "base64")));
}

export async function openFolder() {
	const {
		filePaths: [folderPath],
	} = await dialog.showOpenDialog({ properties: ["openDirectory"] });

	return folderPath ? getFilesFromFolder(folderPath) : null;
}

async function getFilesFromFolder(folderPath: string): Promise<string[]> {
	const files = await _fs.readdir(folderPath);
	return files
		.filter((f: string) => !f.startsWith(".") && !excludedExts.includes(_path.extname(f)))
		.map((f: string) => `${folderPath}/${f}`);
}

function getPageOfFiles(files: string[], page: number) {
	return files.slice((page - 1) * pageSize, page * pageSize);
}
async function loadFile(filePath: string, encoding: string = "utf8") {
	return {
		content: (await _fs.readFile(filePath)).toString(encoding),
		path: _path.parse(filePath),
	};
}
function saveFile(filePath: string, contents: string) {
	return _fs.writeFile(filePath, contents);
}
