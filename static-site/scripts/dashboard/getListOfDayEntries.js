// Import local storage assessor
import { getEntriesListFromLocalStorage } from "./getEntriesListFromLocalStorage.js";
export const dayEntriesListName = "bytesized-journal-day-entries-list";
// This function returns the list of day entries without their values or null
export function getListOfDayEntries() {
    let dayEntriesList = getEntriesListFromLocalStorage(dayEntriesListName);
    return dayEntriesList;
}
