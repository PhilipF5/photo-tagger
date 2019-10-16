import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../Button/Button";
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
			{canDelete ? (
				<Button className={styles.deleteButton} onClick={handleDelete}>
					<FontAwesomeIcon icon={faTrashAlt} />
				</Button>
			) : null}
		</Tag>
	);
};

export default TagWithDelete;
