// Import the local storage assessor
import { getEntriesListFromLocalStorage } from "./getEntriesListFromLocalStorage.js";

export const dreamEntriesListName = "bytesized-journal-dreams-list";

// This function returns the dream entries as a list or null
export function getListOfDreamEntries(): Array<any> | null {    

    let dreamsList: Array<any> | null = getEntriesListFromLocalStorage( dreamEntriesListName );

    return dreamsList;

}