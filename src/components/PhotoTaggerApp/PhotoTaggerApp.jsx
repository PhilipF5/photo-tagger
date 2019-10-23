import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import Gallery from "../Gallery/Gallery";
import TagSelector from "../TagSelector/TagSelector";
import Toolbar from "../Toolbar/Toolbar";
import styles from "./PhotoTaggerApp.module.css";

const {
	remote: { systemPreferences },
} = window.require("electron");

const Store = window.require("electron-store");
const store = new Store({ name: "tagList" });

const PhotoTaggerApp = () => {
	const [darkMode, setDarkMode] = useState(systemPreferences.isDarkMode());
	const [images, setImages] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [tags, setTags] = useState(store.get("tags"));
	const sortedTags = useMemo(() => tags.sort(), [tags]);

	useEffect(() => {
		store.set("tags", tags);
	}, [tags]);

	return (
		<div className={classNames(styles.app, { [styles.darkMode]: darkMode })}>
			<div className={styles.toolbar}>
				<Toolbar setImages={setImages} tags={sortedTags} setTags={setTags} />
			</div>
			<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
			<TagSelector
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
				tags={sortedTags}
				setTags={setTags}
			/>
		</div>
	);
};

export default PhotoTaggerApp;
