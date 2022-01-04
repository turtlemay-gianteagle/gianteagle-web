/**
 * @file Render barcode on product pages.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BarcodeWidget } from "../components/BarcodeWidget";
import { waitForElement } from "../lib/util";

render(processItemInfo(document.body.textContent));

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			let foundItemInfo = null as ReturnType<typeof processItemInfo>;

			// Detect initial item info.
			if (addedNode instanceof Element && addedNode.classList.contains("ProductDetail")) {
				foundItemInfo = processItemInfo(addedNode.textContent);
			}
			// Detect changed item info.
			else if (mutation.target instanceof Element && mutation.target.classList.contains("lh-copy")) {
				const el = document.querySelector(".ProductDetail");
				foundItemInfo = processItemInfo(el?.textContent ?? "");
			}
			
			if (foundItemInfo?.upc) {
				render(foundItemInfo);
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
