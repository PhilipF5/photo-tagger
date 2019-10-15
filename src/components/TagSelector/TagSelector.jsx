import React, { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import styles from "./TagSelector.module.css";

const Store = window.require("electron-store");
const store = new Store({ name: "tagList" });

const TagSelector = ({ selectedTags, setSelectedTags }) => {
	const [tags, setTags] = useState(store.get("tags") || []);
	const [newTag, setNewTag] = useState("");

	useEffect(() => {
		store.set("tags", tags);
	}, [tags]);

	const addTag = () => !tags.includes(newTag) && setTags([...tags, newTag]);
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
				<button className={styles.addButton} onClick={addTag}>
					+
				</button>
			</div>
			{tags.sort().map((t) => (
				<div className={styles.tag}>
					<div className={styles.tagname} onClick={() => toggleTag(t)}>
						{t}
					</div>
					<button className={styles.deleteButton}>X</button>
				</div>
			))}
		</div>
	);
};

export default TagSelector;
