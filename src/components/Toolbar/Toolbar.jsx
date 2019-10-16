import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getFilesFromFolder, loadFile } from "../../utilities/file-utilities";
import Button from "../Button/Button";
import styles from "./Toolbar.module.css";

const {
	remote: { dialog, getCurrentWindow },
} = window.require("electron");

const Toolbar = ({ onFileLoaded, setImages }) => {
	return (
		<div className={styles.toolbar}>
			<Button onClick={() => openFolder(setImages, onFileLoaded)}>
				<FontAwesomeIcon icon={faFolderOpen} />
			</Button>
		</div>
	);
};

const openFolder = async (handleFiles, registerLoad) => {
	const [folderPath] = await dialog.showOpenDialog(getCurrentWindow(), { properties: ["openDirectory"] });
	if (!folderPath) {
		return;
	}

	const fileNames = await getFilesFromFolder(folderPath);
	const files = await Promise.all(
		fileNames.map(
			async (fn) =>
				await loadFile(`${folderPath}/${fn}`).then((file) => {
					registerLoad();
					return file;
				}),
		),
	);
	console.log(files);
	handleFiles(files);
};

export default Toolbar;
