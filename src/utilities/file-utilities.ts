import { promises as fs } from "fs";
import path from "path";
import { XmpSidecar } from "./xmp-sidecar";

export const loadFile = async (filePath: string) => {
	return {
		content: (await fs.readFile(filePath)).toString("base64"),
		path: path.parse(filePath),
		xmpData: XmpSidecar.load(filePath),
	};
};
