const fs = window.require("fs").promises;
const path = window.require("path");

export async function getFilesFromFolder(folderPath: string): Promise<string[]> {
	const files = await fs.readdir(folderPath);
	return files.filter((f: string) => !f.startsWith(".") && path.extname(f) !== ".xmp");
}

export async function loadFile(filePath: string) {
	return {
		content: (await fs.readFile(filePath)).toString("base64"),
		path: path.parse(filePath),
	};
}
