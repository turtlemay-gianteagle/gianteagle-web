import * as React from "react";
import * as JsBarcode from "jsbarcode";

export function Barcode(props: { className?: string; itemInfo: IItemInfo }) {
	const elemRef = React.createRef<HTMLCanvasElement>();

	React.useEffect(() => {
		if (!props.itemInfo.upc) {
			return;
		}
		JsBarcode(elemRef.current as HTMLCanvasElement, props.itemInfo.upc, {
			format: "upc",
			width: 2,
			height: 20,
			margin: 5,
			displayValue: true,
			fontSize: 15,
			background: "transparent",
		});
	});

	return React.createElement("canvas", {
		className: props.className,
		ref: elemRef,
	});
}
