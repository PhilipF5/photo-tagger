import React, { useState } from "react";
import Gallery from "../Gallery/Gallery";
import styles from "./PhotoTaggerApp.module.css";

const { remote } = window.require("electron");

const PhotoTaggerApp = () => {
	const [images, setImages] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	return (
		<div className={styles.app}>
			<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
		</div>
	);
};

export default PhotoTaggerApp;
