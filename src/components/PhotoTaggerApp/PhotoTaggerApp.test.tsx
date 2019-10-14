import React from "react";
import ReactDOM from "react-dom";
import PhotoTaggerApp from "./PhotoTaggerApp";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<PhotoTaggerApp />, div);
	ReactDOM.unmountComponentAtNode(div);
});
