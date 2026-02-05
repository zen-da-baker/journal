// Import helper functions
import { removeDayEntryFromDB } from "./removeDayEntryFromDB.js";

export function removeDayEntryFromDisplay( entryId: string, entryIndex: number) {

    // The journal entry DOM element is expected when the remove button exists 
    let journalEntryUI = document.getElementById( entryId );

    // The DOM element will be removed immediately 

    // The entry is then removed from the list in the local storage

    // Lastly, the entry is removed from the database

}