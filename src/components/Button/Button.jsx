import classNames from "classnames";
import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, className, disabled, onClick, title }) => {
	return (
		<button
			className={classNames(styles.button, className, { [styles.disabled]: disabled })}
			onClick={onClick}
			title={title}
		>
			<div className={styles.background}></div>
			{children}
		</button>
	);
};

export default Button;
