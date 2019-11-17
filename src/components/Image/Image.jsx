import { XmpSidecar } from "@philipf5/xmp-sidecar";
import React, { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import styles from "./Image.module.css";

const fsModule = window.require("fs").promises;
const pathModule = window.require("path");

const Image = ({
	data: {
		content,
		path: { dir, base: fileName },
	},
	selectedTags,
}) => {
	const [xmpData, setXmpData] = useState({ tags: [] });

	useEffect(() => {
		const getXmpData = async () => {
			setXmpData(await XmpSidecar.load(`${dir}/${fileName}`, { fsModule, pathModule }));
		};
		getXmpData();
	}, [dir, fileName]);

	const applyTags = async () => {
		xmpData.addTags(selectedTags);
		setXmpData(await xmpData.save());
	};
	const removeTag = async (tag) => {
		xmpData.removeTag(tag);
		setXmpData(await xmpData.save());
	};

	return (
		<div className={styles.image}>
			<div className={styles.filename}>{fileName}</div>
			<img src={"data:;base64," + content} onClick={applyTags} alt="" />
			<div className={styles.tags}>
				{xmpData.tags
					.filter((t) => t)
					.sort()
					.map((t) => (
						<Tag onClick={() => removeTag(t)}>{t}</Tag>
					))}
			</div>
		</div>
	);
};

export default Image;
