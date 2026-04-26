// Import helper functions
import { updateExistingEntry } from "./updateExistingEntry.js";
export function handleLineEdit(lineId, entry, lineIndex) {
    let currentLineUI = document.getElementById(lineId);
    // If the current line value in the data model is not the same as the line HTML text, save it
    if (entry.listOfLines[lineIndex].value !== currentLineUI.textContent) {
        // Assign the value of the HTML edit to the object
        entry.listOfLines[lineIndex].value = currentLineUI.textContent;
        // Update the existing journal entry in the database
        updateExistingEntry(entry);
    }
}
