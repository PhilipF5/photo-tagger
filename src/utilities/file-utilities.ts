import fs from "fs";
import path from "path";
const _fs: typeof fs.promises = window.require("fs").promises;
const _path: typeof path = window.require("path");

const excludedExts = [".xmp", ".db", ".mp4"];

export async function getFilesFromFolder(folderPath: string): Promise<string[]> {
	const files = await _fs.readdir(folderPath);
	return files
		.filter((f: string) => !f.startsWith(".") && !excludedExts.includes(_path.extname(f)))
		.map((f: string) => `${folderPath}/${f}`);
}

export function getPageOfFiles(files: string[], page: number, pageSize: number) {
	return files.slice((page - 1) * pageSize, page * pageSize);
}

export async function loadFile(filePath: string, encoding: string = "utf8") {
	return {
		content: (await _fs.readFile(filePath)).toString(encoding),
		path: _path.parse(filePath),
	};
}

export function saveFile(filePath: string, contents: string) {
	return _fs.writeFile(filePath, contents);
}
