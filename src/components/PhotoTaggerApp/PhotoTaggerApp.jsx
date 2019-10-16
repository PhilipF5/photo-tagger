import React, { useState } from "react";
import Gallery from "../Gallery/Gallery";
import TagSelector from "../TagSelector/TagSelector";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./PhotoTaggerApp.module.css";

const PhotoTaggerApp = () => {
	const [images, setImages] = useState([]);
	const [loadCount, setLoadCount] = useState(0);
	const [selectedTags, setSelectedTags] = useState([]);

	const handleFileLoad = () => setLoadCount((count) => count + 1);

	return (
		<div className={styles.app}>
			<Toolbar onFileLoaded={handleFileLoad} setImages={setImages} />
			<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
			<TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
		</div>
	);
};

export default PhotoTaggerApp;
