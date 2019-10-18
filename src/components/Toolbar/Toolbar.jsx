import {
	faFileExport,
	faFileImport,
	faFolderOpen,
	faStepBackward,
	faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { exportTagsToFile, importTagsFromFile, loadImages, openFolder, pageSize } from "../../utilities/file-utilities";
import Button from "../Button/Button";
import styles from "./Toolbar.module.css";

const Toolbar = ({ setImages, tags, setTags }) => {
	const [folderContents, setFolderContents] = useState([]);
	const [page, setPage] = useState(0);
	const pageCount = Math.ceil(folderContents.length / pageSize);
	const hasNextPage = page < pageCount;
	const hasPrevPage = page > 1;

	const handleExportTags = () => exportTagsToFile(tags);
	const handleImportTags = async () => {
		const newTags = await importTagsFromFile();
		newTags && setTags(newTags);
	};
	const handleOpenFolder = async () => {
		const fileNames = await openFolder();
		if (fileNames) {
			setPage(0);
			setFolderContents(fileNames);
			setPage(1);
		}
	};
	const handlePageNext = () => setPage((current) => current - 1);
	const handlePagePrev = () => setPage((current) => current + 1);

	useEffect(() => {
		if (page > 0) {
			setImages([]);
			loadImages(folderContents, page).then((files) => setImages(files));
		}
	}, [folderContents, page, setImages]);

	return (
		<div className={styles.toolbar}>
			<div className={styles.group}>
				<Button onClick={handleOpenFolder}>
					<FontAwesomeIcon icon={faFolderOpen} />
				</Button>
			</div>
			<div className={styles.group}>
				<Button disabled={!hasPrevPage} onClick={handlePageNext}>
					<FontAwesomeIcon icon={faStepBackward} />
				</Button>
				<div className={styles.pageCount}>
					{page} / {pageCount}
				</div>
				<Button disabled={!hasNextPage} onClick={handlePagePrev}>
					<FontAwesomeIcon icon={faStepForward} />
				</Button>
			</div>
			<div className={styles.group}>
				<Button onClick={handleImportTags}>
					<FontAwesomeIcon icon={faFileImport} />
				</Button>
				<Button onClick={handleExportTags}>
					<FontAwesomeIcon icon={faFileExport} />
				</Button>
			</div>
		</div>
	);
};

export default Toolbar;
