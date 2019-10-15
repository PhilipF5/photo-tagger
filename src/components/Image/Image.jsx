import React, { useState } from "react";
import { XmpSidecar } from "../../utilities/xmp-sidecar";
import Tag from "../Tag/Tag";
import styles from "./Image.module.css";

const Image = ({ data: { content, path }, selectedTags }) => {
	const [xmpData, setXmpData] = useState(XmpSidecar.load(`${path.dir}/${path.base}`));
	const applyTags = () => {
		xmpData.addTags(selectedTags);
		setXmpData(xmpData.save());
	};
	const removeTag = (tag) => {
		xmpData.removeTag(tag);
		setXmpData(xmpData.save());
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
