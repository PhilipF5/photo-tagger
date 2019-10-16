import { faFolderOpen, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getFilesFromFolder, getPageOfFiles, loadFile } from "../../utilities/file-utilities";
import Button from "../Button/Button";
import styles from "./Toolbar.module.css";

const {
	remote: { dialog, getCurrentWindow },
} = window.require("electron");

const pageSize = 100;

const Toolbar = ({ setImages }) => {
	const [folderContents, setFolderContents] = useState([]);
	const [page, setPage] = useState(0);
	const pageCount = Math.ceil(folderContents.length / pageSize);
	const hasNextPage = page < pageCount;
	const hasPrevPage = page > 1;

	const openFolder = async () => {
		setPage(0);
		setFolderContents(await loadFileNames());
		setPage(1);
	};

	useEffect(() => {
		page > 0 && loadFiles(folderContents, page).then((files) => setImages(files));
	}, [folderContents, page, setImages]);

	return (
		<div className={styles.toolbar}>
			<Button onClick={() => openFolder()}>
				<FontAwesomeIcon icon={faFolderOpen} />
			</Button>
			<Button disabled={!hasPrevPage} onClick={() => setPage((current) => current - 1)}>
				<FontAwesomeIcon icon={faStepBackward} />
			</Button>
			<div className={styles.pageCount}>
				{page} / {pageCount}
			</div>
			<Button disabled={!hasNextPage} onClick={() => setPage((current) => current + 1)}>
				<FontAwesomeIcon icon={faStepForward} />
			</Button>
		</div>
	);
};

const loadFiles = async (files, page) => {
	const fileNames = getPageOfFiles(files, page, pageSize);
	return Promise.all(fileNames.map(async (fileName) => await loadFile(fileName)));
};

const loadFileNames = async () => {
	const {
		filePaths: [folderPath],
	} = await dialog.showOpenDialog(getCurrentWindow(), { properties: ["openDirectory"] });

	return folderPath ? getFilesFromFolder(folderPath) : null;
};

export default Toolbar;
