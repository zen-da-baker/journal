// Import local storage assessor
import { getEntriesListFromLocalStorage } from "./getEntriesListFromLocalStorage.js";

// This function returns the list of day entries without their values or null
export function getListOfDayEntries(): Array<any> | null {

    let dayEntriesListName = "bytesized-journal-day-entries-list";

    let dayEntriesList: Array<any> | null = getEntriesListFromLocalStorage( dayEntriesListName );

    return dayEntriesList;

}