// Update the UI to display the day entries
import { displayDayEntries } from "./displayDayEntries.js";
import { displayDreamEntries } from "./displayDreamEntries.js";

// Display the entries list
displayDayEntries();
displayDreamEntries();

// Access the entry buttons so they can be used with JavaScript
const addDayEntryButtonUI = document.getElementById("add-day-entry-button");
const addDreamEntryButtonUI = document.getElementById("add-dream-entry-button");


