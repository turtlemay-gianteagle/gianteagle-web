/**
 * @file Press a number key to select result items.
 */

addEventListener("keydown", (event: KeyboardEvent) => {
	if (document.activeElement?.nodeName !== "INPUT") {
		if (event.key.match(/^([1-9])$/)?.[1]) {
			const allElems = document.querySelectorAll<HTMLElement>(".ProductsList .ProductTile a .ProductImage");
			const clickElem = allElems[Number(event.key) - 1];
			clickElem?.click();
		}
	}
});
