import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getFilesFromFolder, loadFile } from "../../utilities/file-utilities";
import Button from "../Button/Button";
import styles from "./Toolbar.module.css";

const { remote } = window.require("electron");

const Toolbar = ({ setImages }) => {
	return (
		<div className={styles.toolbar}>
			<Button onClick={() => openFolder(setImages)}>
				<FontAwesomeIcon icon={faFolderOpen} />
			</Button>
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
