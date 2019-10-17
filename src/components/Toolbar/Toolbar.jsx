import {
	faFileExport,
	faFileImport,
	faFolderOpen,
	faStepBackward,
	faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getFilesFromFolder, getPageOfFiles, loadFile, saveFile } from "../../utilities/file-utilities";
import Button from "../Button/Button";
import styles from "./Toolbar.module.css";

const {
	remote: { dialog, getCurrentWindow },
} = window.require("electron");

const pageSize = 100;

const Toolbar = ({ setImages, tags, setTags }) => {
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
		if (page > 0) {
			setImages([]);
			loadFiles(folderContents, page).then((files) => setImages(files));
		}
	}, [folderContents, page, setImages]);

	return (
		<div className={styles.toolbar}>
			<div className={styles.group}>
				<Button onClick={() => openFolder()}>
					<FontAwesomeIcon icon={faFolderOpen} />
				</Button>
			</div>
			<div className={styles.group}>
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
			<div className={styles.group}>
				<Button onClick={async () => setTags(await loadTagsFromFile())}>
					<FontAwesomeIcon icon={faFileImport} />
				</Button>
				<Button onClick={() => exportTagsToFile(tags)}>
					<FontAwesomeIcon icon={faFileExport} />
				</Button>
			</div>
		</div>
	);
};

const exportTagsToFile = async (tags) => {
	const { filePath } = await dialog.showSaveDialog(getCurrentWindow());
	return saveFile(filePath, JSON.stringify(tags, undefined, 4));
};

const loadFiles = async (files, page) => {
	const fileNames = getPageOfFiles(files, page, pageSize);
	return Promise.all(fileNames.map((fileName) => loadFile(fileName, "base64")));
};

const loadFileNames = async () => {
	const {
		filePaths: [folderPath],
	} = await dialog.showOpenDialog(getCurrentWindow(), { properties: ["openDirectory"] });

	return folderPath ? getFilesFromFolder(folderPath) : null;
};

const loadTagsFromFile = async () => {
	const {
		filePaths: [filePath],
	} = await dialog.showOpenDialog(getCurrentWindow(), { filters: [{ extensions: [".json"] }] });

	return filePath ? JSON.parse((await loadFile(filePath)).content) : null;
};

export default Toolbar;
