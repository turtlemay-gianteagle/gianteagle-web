import * as React from "react";
import { Barcode } from "./Barcode";

export function BarcodeWidget() {
	const [itemInfo, setItemInfo] = React.useState<IItemInfo | null>(null);

	React.useEffect(updateItemInfo, []);
	React.useEffect(updateChromeChangedUrlListener);
	React.useEffect(updateMutationObserver);

	return (
		itemInfo && (
			<div className="turtlemay__barcodeWidget">
				<Barcode itemInfo={itemInfo} />
			</div>
		)
	);

	function updateItemInfo() {
		const foundItemInfo = processItemInfo(document.body.textContent);
		setItemInfo(foundItemInfo);
	}

	function updateMutationObserver() {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((addedNode) => {
					const foundSKU = matchSKU(addedNode.textContent);
					if (foundSKU) {
						const foundItemInfo = processItemInfo(
							addedNode.textContent
						);
						setItemInfo(foundItemInfo);
					}
				});
			});
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false,
		});
		return () => observer.disconnect();
	}

	function updateChromeChangedUrlListener() {
		chrome.runtime.onMessage.addListener(listener);
		return () => chrome.runtime.onMessage.removeListener(listener);
		function listener({ type }) {
			if (type === "CHANGED_URL") {
				updateItemInfo();
			}
		}
	}
}

function processItemInfo(str: string | null): IItemInfo | null {
	const foundItemInfo: IItemInfo = {
		sku: matchSKU(str),
	};
	if (foundItemInfo.sku) {
		foundItemInfo.upc = foundItemInfo.sku.slice(2);
	}
	if (foundItemInfo.upc) {
		return foundItemInfo;
	} else {
		return null;
	}
}

function matchSKU(str: string | null): string | null {
	return str?.match(/SKU(\d{14})/)?.[1] || null;
}
