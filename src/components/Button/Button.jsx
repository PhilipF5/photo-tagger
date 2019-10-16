import classNames from "classnames";
import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, className, disabled, onClick }) => {
	return (
		<button className={classNames(styles.button, className, { [styles.disabled]: disabled })} onClick={onClick}>
			<div className={styles.background}></div>
			{children}
		</button>
	);
};

export default Button;
