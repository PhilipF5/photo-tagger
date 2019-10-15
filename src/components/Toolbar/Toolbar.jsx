import React from "react";
import { getFilesFromFolder, loadFile } from "../../utilities/file-utilities";
import styles from "./Toolbar.module.css";

const { remote } = window.require("electron");

const Toolbar = ({ setImages }) => {
	return (
		<div className={styles.toolbar}>
			<button className={styles.button} onClick={() => openFolder(setImages)}>
				Open
			</button>
		</div>
	);
};

const openFolder = (callback) => {
	remote.dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ["openDirectory"] }, async ([folderPath]) => {
		const fileNames = await getFilesFromFolder(folderPath);
		const files = await Promise.all(fileNames.map(async (fn) => await loadFile(`${folderPath}/${fn}`)));
		console.log(files);
		callback(files);
	});
};

export default Toolbar;
