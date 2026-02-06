// Import global variables
import { dayEntriesListName } from "../getListOfDayEntries.js";

// This function removes a particular entry from the localStorage list for day entries and if null, no action is taken
export function removeDayEntryFromLocalStorage( entryIndex: number ): void {

    // Extract the day entries list string from the local storage which may be null
    let entriesListString: string | null = localStorage.getItem( dayEntriesListName );

    // If the entries list exists and the index of the entry exists
    if ( entriesListString !== null && entryIndex !== -1 ) {

        // The entries list is extracted from the JSON string
        let entriesList = JSON.parse( entriesListString );

        // The delete count will be 1
        let deleteCount = 1;

        // The entry is removed from the parsed list using the position in the array
        entriesList.splice( entryIndex, deleteCount );

        // The list is converted to a JSON string once again
        entriesListString = JSON.stringify( entriesList );

        // The JSON string list is stored in the local storage once again
        localStorage.setItem( dayEntriesListName, entriesListString );

    }

}