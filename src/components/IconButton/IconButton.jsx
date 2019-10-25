import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../Button/Button";

const IconButton = ({ className, disabled, icon, onClick }) => {
	return (
		<Button className={className} disabled={disabled} onClick={onClick}>
			<FontAwesomeIcon icon={icon} />
		</Button>
	);
};

export default IconButton;
