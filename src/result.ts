/**
 * @file Press a number key to select result items.
 */

addEventListener("keydown", (event: KeyboardEvent) => {
	if (document.activeElement?.nodeName !== "INPUT") {
		if (event.key.match(/^([1-9])$/)?.[1]) {
			const i = Number(event.key) + 1;
			const allElems = document.querySelectorAll(".ProductsList .ProductTile a");
			const clickElem = allElems[i] as HTMLElement | undefined;
			clickElem?.click();
		}
	}
});
