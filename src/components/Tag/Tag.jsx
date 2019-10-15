import classNames from "classnames";
import React from "react";
import styles from "./Tag.module.css";

const Tag = ({ children, highlight, onClick }) => (
	<span className={classNames(styles.tag, { [styles.highlight]: highlight })} onClick={onClick}>
		{children}
	</span>
);

export default Tag;
