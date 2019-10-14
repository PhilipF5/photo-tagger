import fs from "fs";
import path from "path";
import * as xml2js from "xml2js";
const _fs: typeof fs = window.require("fs");
const _path: typeof path = window.require("path");

export class XmpSidecar {
	public static getXmpPath(pathToFile: string) {
		const pathObject = _path.parse(pathToFile);
		pathObject.base = pathObject.base.replace(pathObject.ext, ".xmp");
		pathObject.ext = ".xmp";
		return pathObject;
	}

	public static load(pathToFile: string) {
		return new XmpSidecar(pathToFile);
	}

	private _filePath: path.ParsedPath;
	private _xml: any;

	private get _descAttributes(): any {
		return this._descObject.$;
	}

	private get _descObject(): any {
		return this.rawXml["x:xmpmeta"]["rdf:RDF"][0]["rdf:Description"][0];
	}

	private get _descTags(): any {
		return this._descObject["dc:subject"][0];
	}

	public get filePath(): string {
		return _path.format(this._filePath);
	}

	public get name(): string {
		return this._filePath.name;
	}

	public get rating(): number {
		return Number(this._descAttributes["xmp:Rating"]);
	}

	public set rating(value: number) {
		this._descAttributes["xmp:Rating"] = String(value);
	}

	public get rawXml(): any {
		return this._xml;
	}

	public get tags(): string[] {
		return this._descTags["rdf:Bag"][0]["rdf:li"];
	}

	public set tags(value: string[]) {
		this._descTags["rdf:Bag"][0]["rdf:li"] = value;
	}

	constructor(pathToFile: string) {
		let filePath = _path.resolve(__dirname, pathToFile);
		this._filePath = _path.parse(filePath);
		this._filePath.base = this._filePath.base.replace(this._filePath.ext, ".xmp");
		this._filePath.ext = ".xmp";

		if (!_fs.existsSync(this.filePath)) {
			const defaultSidecar = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 4.4.0-Exiv2">
	<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
		<rdf:Description rdf:about="" xmlns:MicrosoftPhoto="http://ns.microsoft.com/photo/1.0/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:fstop="http://www.fstopapp.com/xmp/">
			<dc:subject>
				<rdf:Bag>
					<rdf:li></rdf:li>
				</rdf:Bag>
			</dc:subject>
		</rdf:Description>
	</rdf:RDF>
</x:xmpmeta>`;
			_fs.writeFileSync(this.filePath, defaultSidecar);
		}

		xml2js.parseString(_fs.readFileSync(this.filePath), (err, result) => {
			this._xml = result;
		});
	}

	public addTag(tag: string): string[] {
		if (!this.tags.includes(tag)) {
			this.tags = [...this.tags.filter((t) => !!t), tag];
		}
		return this.tags;
	}

	public getAttribute(name: string): string {
		return this._descAttributes[name];
	}

	public hasAttribute(name: string): boolean {
		return this._descAttributes[name] !== undefined;
	}

	public hasTag(tag: string): boolean {
		return this.tags.includes(tag);
	}

	public removeAttribute(name: string): any {
		delete this._descAttributes[name];
		return this._descAttributes;
	}

	public removeTag(tag: string): string[] {
		this.tags = this.tags.filter((item) => item !== tag);
		return this.tags;
	}

	public save(filePath?: string): XmpSidecar {
		let builder = new xml2js.Builder();
		if (filePath) {
			filePath = _path.resolve(__dirname, filePath);
		}
		filePath = filePath || _path.format(this._filePath);
		_fs.writeFileSync(filePath, builder.buildObject(this.rawXml));
		return new XmpSidecar(filePath);
	}

	public setAttribute(name: string, value: string): any {
		this._descAttributes[name] = value;
		return this._descAttributes;
	}
}
