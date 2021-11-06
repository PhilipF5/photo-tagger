import {
	faFileExport,
	faFileImport,
	faFolderOpen,
	faStepBackward,
	faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { exportTagsToFile, importTagsFromFile, loadImages, openFolder, pageSize } from "../../utilities/file-utilities";
import IconButton from "../IconButton/IconButton";
import styles from "./Toolbar.module.css";

const Toolbar = ({ setImages, tags, setLoading, setTags }) => {
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
	const handlePageNext = () => setPage((current) => current + 1);
	const handlePagePrev = () => setPage((current) => current - 1);

	useEffect(() => {
		if (page > 0) {
			setImages([]);
			setLoading(true);
			loadImages(folderContents, page).then((files) => setImages(files));
		}
	}, [folderContents, page, setImages, setLoading]);

	return (
		<div className={styles.toolbar}>
			<div className={styles.group}>
				<IconButton icon={faFolderOpen} onClick={handleOpenFolder} title="Open Folder..." />
			</div>
			<div className={styles.group}>
				<IconButton
					disabled={!hasPrevPage}
					icon={faStepBackward}
					onClick={handlePagePrev}
					title="Previous Page"
				/>
				<div className={styles.pageCount}>
					{page} / {pageCount}
				</div>
				<IconButton disabled={!hasNextPage} icon={faStepForward} onClick={handlePageNext} title="Next Page" />
			</div>
			<div className={styles.group}>
				<IconButton icon={faFileImport} onClick={handleImportTags} title="Import Tags..." />
				<IconButton icon={faFileExport} onClick={handleExportTags} title="Export Tags..." />
			</div>
		</div>
	);
};

export default Toolbar;
