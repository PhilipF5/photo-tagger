import { faCheck, faEdit, faEraser, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import IconButton from "../IconButton/IconButton";
import Tag from "../Tag/Tag";
import TagWithDelete from "../TagWithDelete/TagWithDelete";
import styles from "./TagSelector.module.css";

const TagSelector = ({ selectedTags, setSelectedTags, tags, setTags }) => {
	const [editMode, setEditMode] = useState(false);
	const [newTag, setNewTag] = useState("");

	useEffect(() => {
		setNewTag("");
	}, [tags]);

	const personTags = useMemo(() => getPrefixTags(tags, "person"), [tags]);
	const sourceTags = useMemo(() => getPrefixTags(tags, "source"), [tags]);
	const topicTags = useMemo(() => tags.filter((t) => !t.match(/^\w+:/)), [tags]);

	const addTag = () => !tags.includes(newTag) && setTags([...tags, newTag]);
	const clearTags = () => setTags([]);
	const createTagElement = (tag) => {
		return (
			<TagWithDelete
				canDelete={editMode}
				highlight={isTagSelected(tag)}
				onClick={() => toggleTag(tag)}
				onDelete={() => deleteTag(tag)}
			>
				{tag}
			</TagWithDelete>
		);
	};
	const deleteTag = (tag) => setTags((t) => removeTag(t, tag));
	const handleNewTagChange = ({ target: { value } }) => setNewTag(value);
	const isTagSelected = useCallback((tag) => selectedTags.includes(tag), [selectedTags]);
	const toggleEditMode = () => setEditMode((mode) => !mode);
	const toggleTag = (tag) => setSelectedTags((st) => (st.includes(tag) ? removeTag(st, tag) : [...st, tag]));

	return (
		<div className={styles.sidebar}>
			<div className={styles.section}>
				<h3>Selected tags</h3>
				{selectedTags.sort().map((t) => (
					<Tag onClick={() => toggleTag(t)}>{t}</Tag>
				))}
				<h3>Suggested tags</h3>
				<h3>
					All tags
					<IconButton icon={editMode ? faCheck : faEdit} onClick={toggleEditMode} title={"Edit Tags"} />
					{editMode ? <IconButton icon={faEraser} onClick={clearTags} title="Clear Tags" /> : null}
				</h3>
				<div className={styles.newTag}>
					<input type="text" value={newTag} onChange={handleNewTagChange} placeholder="Add a tag..." />
					<IconButton
						className={styles.addButton}
						disabled={!newTag}
						icon={faPlus}
						onClick={addTag}
						title="Add Tag"
					/>
				</div>
			</div>
			<div className={styles.section}>
				{topicTags.map(createTagElement)}
				<h4>People</h4>
				{personTags.map(createTagElement)}
				<h4>Sources</h4>
				{sourceTags.map(createTagElement)}
			</div>
		</div>
	);
};

const getPrefixTags = (tags, prefix) => tags.filter((t) => t.startsWith(`${prefix}:`));
const removeTag = (tags, tag) => tags.filter((t) => t !== tag);

export default TagSelector;
