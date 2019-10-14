import React from "react";
import styles from "./Image.module.css";

const Image = ({ data, selectedTags }) => {
	const applyTags = () => {
		data.xmpData.addTags(selectedTags);
		data.xmpData.save();
	};
	return (
		<div className={styles.image}>
			<img src={"data:;base64," + data.content} onClick={applyTags} />
		</div>
	);
};

export default Image;
