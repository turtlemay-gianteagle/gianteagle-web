/**
 * @file Select and clear input field.
 */

addEventListener("keydown", (event: KeyboardEvent) => {
	const RESET_KEY = "`";

	const inputElem: HTMLInputElement | null = document.querySelector(
		'input[type="text"][aria-label="Search"]'
	);

	if (!inputElem) {
		return;
	}

	if (event.key === RESET_KEY) {
		event.preventDefault();
		inputElem.focus();
		inputElem.value = "";
	}

	// Focus input if not focused.
	if (document.activeElement?.nodeName !== "INPUT") {
		if (event.key === "Enter") {
			event.preventDefault();
			inputElem.focus();
			inputElem.value = "";
		}
		else if (event.key.match(/^([a-zA-Z])$/)?.[1] && !event.ctrlKey && !event.altKey) {
			inputElem.focus();
		}
	}
});
