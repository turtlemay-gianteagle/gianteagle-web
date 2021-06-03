import * as React from "react";
import * as ReactDOM from "react-dom";
import { BarcodeWidget } from "../components/BarcodeWidget";
import { waitForElement } from "../lib/util";

import "./search";
import "./intercom";

const el = document.createElement("div");
el.className = "turtlemay__barcodeWidgetRoot";
ReactDOM.render(React.createElement(BarcodeWidget), el);

update();

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			if (
				addedNode instanceof HTMLElement &&
				addedNode.classList.contains("ProductDetail")
			) {
				update();
			}
		});
	});
}).observe(document.body, {
	childList: true,
	subtree: true,
});

async function update() {
	const v = await waitForElement(".ProductDetail .mb3");
	v.insertAdjacentElement("afterend", el);
}
