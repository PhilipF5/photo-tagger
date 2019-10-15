import React, { useEffect, useState } from "react";
import { XmpSidecar } from "../../utilities/xmp-sidecar";
import Tag from "../Tag/Tag";
import styles from "./Image.module.css";

const Image = ({ data: { content, path }, selectedTags }) => {
	const [xmpData, setXmpData] = useState({ tags: [] });

	useEffect(() => {
		const getXmpData = async () => {
			setXmpData(await XmpSidecar.load(`${path.dir}/${path.base}`));
		};
		getXmpData();
	}, [path.dir, path.base]);

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
			<div className={styles.filename}>{path.base}</div>
			<img src={"data:;base64," + content} onClick={applyTags} />
			<div className={styles.tags}>
				{xmpData.tags.sort().map((t) => (
					<Tag onClick={() => removeTag(t)}>{t}</Tag>
				))}
			</div>
		</div>
	);
};

export default Image;
