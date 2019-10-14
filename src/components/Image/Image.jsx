import React from "react";
import styles from "./Image.module.css";

const Image = ({ data }) => {
	return (
		<div className={styles.image}>
			<img src={"data:image/jpg;base64," + data.content} />
		</div>
	);
};

export default Image;
