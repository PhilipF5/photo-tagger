import React, { useEffect, useState } from "react";
import { getFilesFromFolder, loadFile } from "../../utilities/file-utilities";
import Gallery from "../Gallery/Gallery";
import styles from "./PhotoTaggerApp.module.css";

const { remote } = window.require("electron");

const PhotoTaggerApp = () => {
	const [images, setImages] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);

	useEffect(() => {
		remote.dialog.showOpenDialog(
			remote.getCurrentWindow(),
			{ properties: ["openDirectory"] },
			async ([folderPath]) => {
				const fileNames = await getFilesFromFolder(folderPath);
				const files = await Promise.all(fileNames.map(async (fn) => await loadFile(`${folderPath}/${fn}`)));
				console.log(files);
				setImages(files);
			},
		);
	}, []);

	return (
		<div className={styles.app}>
			<Gallery images={images} setImages={setImages} selectedTags={selectedTags} />
		</div>
	);
};

export default PhotoTaggerApp;
