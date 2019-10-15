import classNames from "classnames";
import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, className, onClick }) => {
	return (
		<button className={classNames(styles.button, className)} onClick={onClick}>
			<div className={styles.background}></div>
			{children}
		</button>
	);
};

export default Button;
