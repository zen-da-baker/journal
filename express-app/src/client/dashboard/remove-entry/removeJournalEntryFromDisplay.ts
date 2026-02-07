// Import helper functions
import { removeJournalEntryFromDB } from "./removeJournalEntryFromDB.js";
import { removeJournalEntryFromLocalStorage } from "./removeJournalEntryFromLocalStorage.js";
import { displayJournalEntries } from "../display-entries-lists/displayJournalEntries.js";

export function removeDayEntryFromDisplay( entryId: string, entryIndex: number, entryType: string ) {

    // The entry is then removed from the list in the local storage
    removeJournalEntryFromLocalStorage( entryIndex, entryType );

    // The DOM element will be removed immediately by reloading the display
    displayJournalEntries();

    // Lastly, the entry is removed from the database
    removeJournalEntryFromDB( entryId, entryType );

}