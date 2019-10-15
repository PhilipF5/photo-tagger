import React, { useState } from "react";
import Gallery from "../Gallery/Gallery";
import TagSelector from "../TagSelector/TagSelector";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./PhotoTaggerApp.module.css";

const PhotoTaggerApp = () => {
	const [images, setImages] = useState([]);
	const [selectedTags, setSelectedTags] = useState(["university", "aerial", "construction"]);

	return (
		<div className={styles.app}>
			<Toolbar setImages={setImages} />
			<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
			<TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
		</div>
	);
};

export default PhotoTaggerApp;
