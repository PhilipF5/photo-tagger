import React, { useState } from "react";
import Gallery from "../Gallery/Gallery";
import TagSelector from "../TagSelector/TagSelector";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./PhotoTaggerApp.module.css";

const PhotoTaggerApp = () => {
	const [images, setImages] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);

	return (
		<div className={styles.app}>
			<div className={styles.toolbar}>
				<Toolbar setImages={setImages} />
			</div>
			<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
			<TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
		</div>
	);
};

export default PhotoTaggerApp;
