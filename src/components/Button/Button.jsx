import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			<div className={styles.background}></div>
			{children}
		</button>
	);
};

export default Button;
