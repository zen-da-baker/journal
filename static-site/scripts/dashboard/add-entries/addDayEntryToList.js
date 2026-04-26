// Import helper functions
import { getListOfDayEntries } from "../getListOfJournalEntries.js";
// Import list name
import { dayEntriesListName } from "../getListOfJournalEntries.js";
export function addDayEntryToList(entry) {
    // Get the list of entries from the helper function
    let listOfDayEntries = getListOfDayEntries();
    // Create a simplified item listing for simply recalling the full entry later 
    let listItem = {
        id: entry.id,
        title: entry.title,
        createdOn: entry.createdOn
    };
    // If the entries list contains values, add the new entry to it
    if (listOfDayEntries !== null) {
        // Add the new entry to the list 
        listOfDayEntries.unshift(listItem);
        let listString = JSON.stringify(listOfDayEntries);
        localStorage.setItem(dayEntriesListName, listString);
    }
    if (listOfDayEntries === null) {
        listOfDayEntries = [];
        listOfDayEntries.unshift(listItem);
        let listString = JSON.stringify(listOfDayEntries);
        localStorage.setItem(dayEntriesListName, listString);
    }
}
