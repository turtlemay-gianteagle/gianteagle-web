addEventListener("keydown", (event: KeyboardEvent) => {
	const inputElem: HTMLInputElement | null = document.querySelector(
		'input[type="text"][aria-label="Search"]'
	);

	if (inputElem && document.activeElement?.nodeName !== "INPUT") {
		if (event.key === "Enter" || event.key === "`") {
			event.preventDefault();
			inputElem.focus();
			inputElem.value = "";
		}
		else if (event.key.match(/^([a-zA-Z])$/)?.[1]) {
			inputElem.focus();
		}
	}
});
