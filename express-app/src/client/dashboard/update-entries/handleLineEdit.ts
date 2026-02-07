// Import data models
import { EntryModel } from "../../models/EntryModel.js";

// Import helper functions
import { updateExistingDayEntry } from "./updateExistingDayEntry.js";

export function handleLineEdit( lineId: string, entry: EntryModel, lineIndex: number ) {

    let currentLineUI = document.getElementById( lineId );

    // If the current line value in the data model is not the same as the line HTML text, save it
    if ( entry.listOfLines[ lineIndex ].value !== currentLineUI.textContent ) {

        // Assign the value of the HTML edit to the object
        entry.listOfLines[ lineIndex ].value = currentLineUI.textContent;

        // Update the existing journal entry in the database
        updateExistingDayEntry( entry );

    }

}