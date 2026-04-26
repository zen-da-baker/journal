// Import helper functions
import { getListOfJournalEntries } from "../getListOfJournalEntries.js";
// This helper function takes an entry id and finds the local storage list index based on it
export function getEntryLocalStorageIndex(entryId, entryType) {
    let entriesList = getListOfJournalEntries(entryType);
    let entryIndex = -1;
    if (entriesList !== null) {
        entryIndex = entriesList.findIndex((searchEntry) => {
            if (searchEntry.id === entryId) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    return entryIndex;
}
