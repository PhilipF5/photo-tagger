import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import React, { useCallback } from "react";
import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = () => {
	const element = useCallback((node) => {
		node && createTimeline(node);
	}, []);

	return (
		<div ref={element} className={styles.loading}>
			<FontAwesomeIcon icon={faImage} />
		</div>
	);
};

const createTimeline = (target) => {
	return gsap
		.timeline({ repeat: -1, yoyo: true })
		.to(target, { duration: 0.25, scaleX: 1.5, scaleY: 0.75, ease: "linear.inOut" }, "+=0.25")
		.to(target, { duration: 0.1, scaleX: 1, scaleY: 1, ease: "linear.inOut" })
		.to(target, { duration: 0.5, scaleX: 0.75, scaleY: 1.25, y: -100 });
};

export default LoadingIndicator;
