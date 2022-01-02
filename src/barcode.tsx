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
			if (
				addedNode instanceof HTMLElement &&
				addedNode.classList.contains("ProductDetail")
			) {
				const foundItemInfo = processItemInfo(addedNode.textContent);
				if (foundItemInfo?.upc) {
					render(foundItemInfo);
				}
			}
		});
	});
}).observe(document.body, {
	childList: true,
	subtree: true,
});

async function render(itemInfo: IItemInfo | null) {
	const barcodeWidgetRootElem = document.createElement("div");
	barcodeWidgetRootElem.className = "turtlemay__barcodeWidgetRoot";
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
