// Import the local storage assessor
import { getEntriesListFromLocalStorage } from "./getEntriesListFromLocalStorage.js";

// This function returns the dream entries as a list or null
export function getListOfDreamEntries(): Array<any> | null {

    let dreamsListName = "bytesized-journal-dreams-list";

    let dreamsList: Array<any> | null = getEntriesListFromLocalStorage( dreamsListName );

    return dreamsList;

}