import React, { useCallback, useState } from "react";
import Gallery from "../Gallery/Gallery";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import TagSelector from "../TagSelector/TagSelector";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./PhotoTaggerApp.module.css";

const PhotoTaggerApp = () => {
	const [images, setImages] = useState([]);
	const [loadCount, setLoadCount] = useState(0);
	const [selectedTags, setSelectedTags] = useState([]);

	const handleFileLoad = useCallback(() => {
		setLoadCount((count) => count + 1);
	}, [setLoadCount]);

	return (
		<div className={styles.app}>
			<Toolbar onFileLoaded={handleFileLoad} setImages={setImages} />
			{images.length ? (
				<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
			) : (
				<LoadingIndicator loadCount={loadCount} />
			)}
			<TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
		</div>
	);
};

export default PhotoTaggerApp;
