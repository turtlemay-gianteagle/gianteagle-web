/**
 * @file Navigate home.
 */

addEventListener("keydown", (event: KeyboardEvent) => {
	const HOME_URL = "/search";

	if (document.activeElement?.nodeName !== "INPUT") {
		if (event.key === "Escape") {
			location.href = HOME_URL;
		}
	}
});
