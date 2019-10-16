import React from "react";
import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = ({ loadCount }) => <div className={styles.loading}>{loadCount}</div>;

export default LoadingIndicator;
