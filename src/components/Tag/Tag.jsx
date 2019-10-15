import React from "react";
import styles from "./Tag.module.css";

const Tag = ({ children, onClick }) => (
	<span className={styles.tag} onClick={onClick}>
		{children}
	</span>
);

export default Tag;
