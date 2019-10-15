import React, { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import styles from "./TagSelector.module.css";

const Store = require("electron-store");
const store = new Store({ name: "tagList" });

const TagSelector = ({ selectedTags, setSelectedTags }) => {
	const [tags, setTags] = useState(store.get("tags") || []);

	useEffect(() => {
		store.set("tags", tags);
	}, [tags]);

	return (
		<div className={styles.sidebar}>
			<h3>Selected tags</h3>
			{selectedTags.sort().map((t) => (
				<Tag>{t}</Tag>
			))}
			<h3>Suggested tags</h3>
			<h3>All tags</h3>
		</div>
	);
};

export default TagSelector;
