import { XmpSidecar } from "./xmp-sidecar";
const fs = window.require("fs").promises;
const path = window.require("path");

export const loadFile = async (filePath: string) => {
	return {
		content: (await fs.readFile(filePath)).toString("base64"),
		path: path.parse(filePath),
		xmpData: XmpSidecar.load(filePath),
	};
};
