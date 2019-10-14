import React, { useState } from "react";
import { XmpSidecar } from "../../utilities/xmp-sidecar";
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
			<img src={"data:;base64," + content} onClick={applyTags} />
			<div className={styles.tags}>
				{xmpData.tags.sort().map((t) => (
					<span className={styles.tag} onClick={() => removeTag(t)}>
						{t}
					</span>
				))}
			</div>
		</div>
	);
};

export default Image;
