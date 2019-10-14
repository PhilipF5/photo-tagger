const fs = window.require("fs").promises;
const path = window.require("path");

export const getFilesFromFolder = async (folderPath: string) => {
	const files = await fs.readdir(folderPath);
	return files.filter((f: string) => !f.startsWith(".") && path.extname(f) !== ".xmp");
};

export const loadFile = async (filePath: string) => {
	return {
		content: (await fs.readFile(filePath)).toString("base64"),
		path: path.parse(filePath),
	};
};
