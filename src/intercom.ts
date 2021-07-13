/**
 * @file Remove intercom feature.
 */

import { waitForElement } from "../lib/util";

waitForElement("#intercom-frame").then((v) => v.remove());
waitForElement("#intercom-container").then((v) => v.remove());
waitForElement("#intercom-css-container").then((v) => v.remove());
waitForElement(".intercom-lightweight-app").then((v) => v.remove());
waitForElement(".intercom-app").then((v) => v.remove());
