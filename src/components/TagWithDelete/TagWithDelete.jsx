import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import IconButton from "../IconButton/IconButton";
import Tag from "../Tag/Tag";
import styles from "./TagWithDelete.module.css";

const TagWithDelete = ({ canDelete, children: tag, highlight, onClick, onDelete }) => {
	const handleDelete = (event) => {
		event.stopPropagation();
		onDelete();
	};

	return (
		<Tag highlight={highlight} onClick={onClick}>
			{tag}
			{canDelete ? <IconButton className={styles.deleteButton} icon={faTrashAlt} onClick={handleDelete} /> : null}
		</Tag>
	);
};

export default TagWithDelete;
