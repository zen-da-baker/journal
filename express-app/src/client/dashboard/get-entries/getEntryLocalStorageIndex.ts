// Import helper functions
import { getListOfDayEntries } from "../getListOfDayEntries.js";

// This helper function takes an entry id and finds the local storage list index based on it
export function getEntryLocalStorageIndex( entryId: string ) {

    let dayEntriesList = getListOfDayEntries();

    let entryIndex: number = -1;

    if ( dayEntriesList !== null ) {

        entryIndex = dayEntriesList.findIndex( ( searchEntry: any ) => {

            if ( searchEntry.id === entryId ) {

                return true;

            } else {

                return false;

            }

        })

    }

    return entryIndex;

}