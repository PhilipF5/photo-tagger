import React, { useEffect, useState } from "react";
import Gallery from "../Gallery/Gallery";
import TagSelector from "../TagSelector/TagSelector";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./PhotoTaggerApp.module.css";

const Store = window.require("electron-store");
const store = new Store({ name: "tagList" });

const PhotoTaggerApp = () => {
	const [images, setImages] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [tags, setTags] = useState((store.get("tags") || []).sort());

	useEffect(() => {
		store.set("tags", tags);
	}, [tags]);

	return (
		<div className={styles.app}>
			<div className={styles.toolbar}>
				<Toolbar setImages={setImages} />
			</div>
			<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
			<TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} tags={tags} setTags={setTags} />
		</div>
	);
};

export default PhotoTaggerApp;
