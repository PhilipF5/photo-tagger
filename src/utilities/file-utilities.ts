const fs = window.require("fs").promises;
const path = window.require("path");

const excludedExts = [".xmp", ".db", ".mp4"];

export async function getFilesFromFolder(folderPath: string): Promise<string[]> {
	const files = await fs.readdir(folderPath);
	return files
		.filter((f: string) => !f.startsWith(".") && !excludedExts.includes(path.extname(f)))
		.map((f: string) => `${folderPath}/${f}`);
}

export function getPageOfFiles(files: string[], page: number, pageSize: number) {
	return files.slice((page - 1) * pageSize, page * pageSize);
}

export async function loadFile(filePath: string, encoding: string = "utf8") {
	return {
		content: (await fs.readFile(filePath)).toString(encoding),
		path: path.parse(filePath),
	};
}
