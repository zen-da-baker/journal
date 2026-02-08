// Import the list of day and dream entries to access their IDs
import { getListOfJournalEntries } from "../dashboard/getListOfJournalEntries.js";

/* 
    This helper function compares the dream and day entries IDs and returns 
    false if the ID does not already exist and true if it does 
*/
export function checkIfIdExists( inputId: string ): boolean {

    // The condition for reporting if the ID already exists
    let exists: boolean = false;

    // Get the list of entries
    let dayEntries = getListOfJournalEntries( "day" );

    let dreamEntries = getListOfJournalEntries( "dream" );

    // If the list exists, search it and compare the entry ID to the input ID and mark if they are the same
    if ( dayEntries !== null ) {

        dayEntries.forEach( ( entry: any ) => {

            if ( entry.id === inputId ) {

                exists = true;

            }

        })

    }

    if ( dreamEntries !== null ) {

        dreamEntries.forEach( ( entry: any ) => {

            if ( entry.id === inputId ) {

                exists = true;

            }

        })

    }

    return exists;

}