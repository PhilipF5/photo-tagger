import { promises as fs } from "fs";
import { XmpSidecar } from "./xmp-sidecar";

export const loadFile = async (path: string) => {
	const file = {
		content: (await fs.readFile(path)).toString("base64"),
		path,
		xmpData: XmpSidecar.load(path),
	};
};
