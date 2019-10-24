import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Linear, TimelineMax } from "gsap";
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
	return new TimelineMax()
		.to(target, 0.5, { scaleX: 1.5, scaleY: 0.75, ease: Linear.easeInOut })
		.to(target, 0.5, { scaleX: 1, scaleY: 1, ease: Linear.easeInOut })
		.to(target, 0.5, { scaleX: 0.75, scaleY: 1.25, y: -100 })
		.repeat(-1)
		.yoyo(true);
};

export default LoadingIndicator;
