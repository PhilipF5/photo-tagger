import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../Button/Button";

const IconButton = ({ className, disabled, icon, onClick, title }) => {
	return (
		<Button className={className} disabled={disabled} onClick={onClick} title={title}>
			<FontAwesomeIcon icon={icon} />
		</Button>
	);
};

export default IconButton;
