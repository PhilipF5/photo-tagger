import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Tag from "../Tag/Tag";
import styles from "./TagSelector.module.css";

const Store = window.require("electron-store");
const store = new Store({ name: "tagList" });

const TagSelector = ({ selectedTags, setSelectedTags }) => {
	const [tags, setTags] = useState(store.get("tags") || []);
	const [newTag, setNewTag] = useState("");

	useEffect(() => {
		store.set("tags", tags);
		setNewTag("");
	}, [tags]);

	const addTag = () => !tags.includes(newTag) && setTags([...tags, newTag]);
	const deleteTag = (event, tag) => {
		event.stopPropagation();
		setTags(tags.filter((t) => t !== tag));
	};
	const handleNewTagChange = ({ target: { value } }) => setNewTag(value);
	const toggleTag = (tag) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	return (
		<div className={styles.sidebar}>
			<h3>Selected tags</h3>
			{selectedTags.sort().map((t) => (
				<Tag>{t}</Tag>
			))}
			<h3>Suggested tags</h3>
			<h3>All tags</h3>
			<div className={styles.tag}>
				<input type="text" value={newTag} onChange={handleNewTagChange} placeholder="Add a tag..." />
				<Button className={styles.addButton} onClick={addTag}>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
			</div>
			{tags.sort().map((t) => (
				<Tag onClick={() => toggleTag(t)}>
					{t}
					<Button className={styles.deleteButton} onClick={(e) => deleteTag(e, t)}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</Button>
				</Tag>
			))}
		</div>
	);
};

export default TagSelector;
