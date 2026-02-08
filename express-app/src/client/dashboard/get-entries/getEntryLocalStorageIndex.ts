// Import helper functions
import { getListOfJournalEntries } from "../getListOfJournalEntries.js";

// This helper function takes an entry id and finds the local storage list index based on it
export function getEntryLocalStorageIndex( entryId: string, entryType: string ) {

    let entriesList = getListOfJournalEntries( entryType );

    let entryIndex: number = -1;

    if ( entriesList !== null ) {

        entryIndex = entriesList.findIndex( ( searchEntry: any ) => {

            if ( searchEntry.id === entryId ) {

                return true;

            } else {

                return false;

            }

        })

    }

    return entryIndex;

}