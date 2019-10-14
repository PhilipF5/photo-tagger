import React from "react";
import Image from "../Image/Image";
import styles from "./Gallery.module.css";

const Gallery = ({ images, setImages, selectedTags }) => {
	return (
		<div className={styles.gallery}>
			{images.map((i) => (
				<Image data={i} />
			))}
		</div>
	);
};

export default Gallery;
