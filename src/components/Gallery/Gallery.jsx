import React from "react";
import styles from "./Gallery.module.css";

const Gallery = ({ images, setImages, selectedTags }) => {
	return images.map((i) => <div className={styles.gallery}>{i}</div>);
};

export default Gallery;
