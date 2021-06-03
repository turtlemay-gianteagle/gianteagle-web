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

async function update() {
	const v = await waitForElement(".ProductDetail .mb3");
	v.insertAdjacentElement("afterend", el);
}
