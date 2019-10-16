const fs = window.require("fs").promises;
const path = window.require("path");

const excludedExts = [".xmp", ".db", ".mp4"];

export async function getFilesFromFolder(folderPath: string): Promise<string[]> {
	const files = await fs.readdir(folderPath);
	return files
		.filter((f: string) => !f.startsWith(".") && !excludedExts.includes(path.extname(f)))
		.map((f: string) => `${folderPath}/${f}`);
}

export async function loadFile(filePath: string) {
	return {
		content: (await fs.readFile(filePath)).toString("base64"),
		path: path.parse(filePath),
	};
}
