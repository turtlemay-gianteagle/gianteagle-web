/**
 * @file Render barcode on product pages.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BarcodeWidget } from "../components/BarcodeWidget";
import { waitForElement } from "../lib/util";

render(processItemInfo(document.body.textContent));

const titleElem = document.querySelector("title");

let foundItemInfo = null as ReturnType<typeof processItemInfo>;

titleElem && new MutationObserver((mutations) => {
	const el = document.querySelector(".ProductDetail");
	foundItemInfo = el && processItemInfo(el.textContent);
	foundItemInfo?.upc && render(foundItemInfo);
}).observe(titleElem, {
	characterData: true,
	childList: true,
	subtree: true,
});

document.body && new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			if (addedNode instanceof Element && addedNode.classList.contains("ProductDetail")) {
				foundItemInfo = processItemInfo(addedNode.textContent);
				foundItemInfo?.upc && render(foundItemInfo);
			}
		});
	});
}).observe(document.body, {
	childList: true,
	subtree: true,
});

async function render(itemInfo: IItemInfo | null) {
	let barcodeWidgetRootElem = document.querySelector(".turtlemay__barcodeWidgetRoot");
	if (!barcodeWidgetRootElem) {
		barcodeWidgetRootElem = document.createElement("div");
		barcodeWidgetRootElem.className = "turtlemay__barcodeWidgetRoot";
	}
	const v = await waitForElement(".ProductDetail .mb3");
	v.insertAdjacentElement("afterend", barcodeWidgetRootElem);
	ReactDOM.render(
		<BarcodeWidget itemInfo={itemInfo} />,
		barcodeWidgetRootElem
	);
}

function processItemInfo(str: string | null): IItemInfo | null {
	const foundItemInfo: IItemInfo = {
		sku: matchSKU(str),
	};
	if (foundItemInfo.sku) {
		foundItemInfo.upc = foundItemInfo.sku.slice(2);
		return foundItemInfo;
	} else {
		return null;
	}
}

function matchSKU(str: string | null): string | null {
	return str?.match(/SKU(\d{14})/)?.[1] || null;
}
