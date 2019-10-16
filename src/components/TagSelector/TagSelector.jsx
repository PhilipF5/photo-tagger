import { faCheck, faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../Button/Button";
import Tag from "../Tag/Tag";
import styles from "./TagSelector.module.css";

const Store = window.require("electron-store");
const store = new Store({ name: "tagList" });

const TagSelector = ({ selectedTags, setSelectedTags }) => {
	const [editMode, setEditMode] = useState(false);
	const [tags, setTags] = useState((store.get("tags") || []).sort());
	const [newTag, setNewTag] = useState("");

	useEffect(() => {
		store.set("tags", tags);
		setNewTag("");
	}, [tags]);

	const personTags = useMemo(() => tags.filter((t) => t.startsWith("person:")), [tags]);
	const sourceTags = useMemo(() => tags.filter((t) => t.startsWith("source:")), [tags]);
	const topicTags = useMemo(() => tags.filter((t) => !t.match(/^\w+:/)), [tags]);

	const addTag = () => !tags.includes(newTag) && setTags([...tags, newTag]);
	const createTagElement = (tag) => {
		return (
			<Tag highlight={selectedTags.includes(tag)} onClick={() => toggleTag(tag)}>
				{tag}
				{editMode ? (
					<Button className={styles.deleteButton} onClick={(e) => deleteTag(e, tag)}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</Button>
				) : null}
			</Tag>
		);
	};
	const deleteTag = (event, tag) => {
		event.stopPropagation();
		setTags(tags.filter((t) => t !== tag));
	};
	const handleNewTagChange = ({ target: { value } }) => setNewTag(value);
	const toggleEditMode = () => setEditMode((mode) => !mode);
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
				<Tag onClick={() => toggleTag(t)}>{t}</Tag>
			))}
			<h3>Suggested tags</h3>
			<h3>
				All tags
				<Button onClick={toggleEditMode}>
					<FontAwesomeIcon icon={editMode ? faCheck : faEdit} />
				</Button>
			</h3>
			<div className={styles.newTag}>
				<input type="text" value={newTag} onChange={handleNewTagChange} placeholder="Add a tag..." />
				<Button className={styles.addButton} onClick={addTag}>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
			</div>
			{topicTags.map(createTagElement)}
			<h4>People</h4>
			{personTags.map(createTagElement)}
			<h4>Sources</h4>
			{sourceTags.map(createTagElement)}
		</div>
	);
};

export default TagSelector;
