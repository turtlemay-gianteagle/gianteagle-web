addEventListener("keydown", handleKeyDown);

function handleKeyDown(event: KeyboardEvent) {
	const elem: HTMLInputElement | null = document.querySelector(
		'input[type="text"][aria-label="Search"]'
	);

	if (
		elem &&
		document.activeElement?.nodeName !== "INPUT" &&
		event.key.match(/^([a-zA-Z])$/)?.[1]
	) {
		elem.focus();
	}
}
