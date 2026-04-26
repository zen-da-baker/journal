// Import helper functions
import { getListOfDreamEntries } from "../getListOfDreamEntries.js";
// Import list name
import { dreamEntriesListName } from "../getListOfDreamEntries.js";
export function addDreamEntryToList(entry) {
    // Get the list of entries from the helper function
    let listOfDayEntries = getListOfDreamEntries();
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
        localStorage.setItem(dreamEntriesListName, listString);
    }
    if (listOfDayEntries === null) {
        listOfDayEntries = [];
        listOfDayEntries.unshift(listItem);
        let listString = JSON.stringify(listOfDayEntries);
        localStorage.setItem(dreamEntriesListName, listString);
    }
}
