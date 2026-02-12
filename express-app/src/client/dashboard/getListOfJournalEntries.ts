// Import local storage assessor
import { getEntriesListFromLocalStorage } from "./getEntriesListFromLocalStorage.js";

export const dayEntriesListName = "bytesized-journal-day-entries-list";
export const dreamEntriesListName = "bytesized-journal-dreams-entries-list";

// This function returns the list of day or dream entries or an empty list if one was not found
export function getListOfJournalEntries( entryType: string = "day" ): Array<any> {

    if ( entryType === "day" ) {

        let dayEntriesList: Array<any> | null = getEntriesListFromLocalStorage( dayEntriesListName );

        if ( dayEntriesList === null ) {

            dayEntriesList = [];

        }

        return dayEntriesList;

    } else {

        let dreamEntriesList: Array<any> | null = getEntriesListFromLocalStorage( dreamEntriesListName );

        if ( dreamEntriesList === null ) {

            dreamEntriesList = [];

        }

        return dreamEntriesList;
        
    }

}