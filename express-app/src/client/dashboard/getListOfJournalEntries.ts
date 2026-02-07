// Import local storage assessor
import { getEntriesListFromLocalStorage } from "./getEntriesListFromLocalStorage.js";

export const dayEntriesListName = "bytesized-journal-day-entries-list";
export const dreamEntriesListName = "bytesized-journal-dreams-entries-list";

// This function returns the list of day entries without their values or null
export function getListOfJournalEntries( entryType: string = "day" ): Array<any> | null {

    if ( entryType === "day" ) {

        let dayEntriesList: Array<any> | null = getEntriesListFromLocalStorage( dayEntriesListName );

        return dayEntriesList;

    } else {

        let dreamEntriesList: Array<any> | null = getEntriesListFromLocalStorage( dreamEntriesListName );

        return dreamEntriesList;
        
    }

}