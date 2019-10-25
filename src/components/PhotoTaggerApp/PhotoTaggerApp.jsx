import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import Gallery from "../Gallery/Gallery";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
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
	const [loading, setLoading] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);
	const [tags, setTags] = useState(store.get("tags"));
	const sortedTags = useMemo(() => tags.sort(), [tags]);

	useEffect(() => {
		store.set("tags", tags);
	}, [tags]);

	useEffect(() => {
		loading && images.length && setLoading(false);
	}, [loading, images]);

	return (
		<div className={classNames(styles.app, { [styles.darkMode]: darkMode })}>
			<div className={styles.toolbar}>
				<Toolbar setImages={setImages} tags={sortedTags} setLoading={setLoading} setTags={setTags} />
			</div>
			{loading ? (
				<div className={styles.loading}>
					<LoadingIndicator />
				</div>
			) : null}
			{!loading && images.length ? (
				<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
			) : null}
			{!loading && !images.length ? (
				<div className={styles.instructions}>Open a folder to get started</div>
			) : null}
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
