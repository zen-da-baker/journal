// Update the UI to display the day entries
import { displayDayEntries } from "./display-entries-lists/displayDayEntries.js";
import { displayDreamEntries } from "./display-entries-lists/displayDreamEntries.js";

// Import DOM listener functions
import { addDayEntry } from "./add-entries/addDayEntry.js";
import { addDreamEntry } from "./add-entries/addDreamEntry.js";

// Display the entries list
displayDayEntries();
displayDreamEntries();

// Access the entry buttons so they can be used with JavaScript
const addDayEntryButtonUI = document.getElementById("add-day-entry-button");
const addDreamEntryButtonUI = document.getElementById("add-dream-entry-button");

addDayEntryButtonUI.onclick = addDayEntry;
addDreamEntryButtonUI.onclick = addDreamEntry;
