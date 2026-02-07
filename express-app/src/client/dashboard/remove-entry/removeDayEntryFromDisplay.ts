// Import helper functions
import { removeDayEntryFromDB } from "./removeDayEntryFromDB.js";
import { removeDayEntryFromLocalStorage } from "./removeDayEntryFromLocalStorage.js";
import { displayDayEntries } from "../display-entries-lists/displayJournalEntries.js";

export function removeDayEntryFromDisplay( entryId: string, entryIndex: number) {

    // The entry is then removed from the list in the local storage
    removeDayEntryFromLocalStorage( entryIndex );

    // The DOM element will be removed immediately by reloading the display
    displayDayEntries();

    // Lastly, the entry is removed from the database
    removeDayEntryFromDB( entryId );

}