// Import database helpers
import { database, dayObjectStoreName, dreamObjectStoreName } from "../../database/db.js";

// Import helper functions
import { displayJournalEntry } from "../display-entry/displayJournalEntry.js";
import { displayEntryError } from "../display-entry/displayEntryError.js";

export function getJournalEntryData( entryId: string | null, entryType: string | null ): void {

    // If the entry ID or type in the URL do not exist, this function will not execute and avoids a runtime error
    if ( entryId === null || entryType === null ) {

        return;

    }

    // If the database wasn't connected yet, try again after one second
    if ( database === undefined ) {

        console.log("Attempting to connect to stored data.");

        // Set a timer for one second and execute the connection again
        setTimeout( () => getJournalEntryData( entryId, entryType ), 100 );

    }

    // If the database has been connected now
    if ( database !== null && database !== undefined ) {

        let objectStoreName: string = dayObjectStoreName;

        if ( entryType === "day" ) {

            objectStoreName = dayObjectStoreName;

        } else {

            objectStoreName = dreamObjectStoreName;
            
        }

        let dayEntryTransaction = database.transaction( objectStoreName, "readonly" );

        let dayObjectStore = dayEntryTransaction.objectStore( objectStoreName );

        let retrievalRequest = dayObjectStore.get( entryId );

        retrievalRequest.onsuccess = ( event: any ) => {

            console.log("Stored data accessed successfully.")

            displayJournalEntry( event.target.result );

        }

        retrievalRequest.onerror = ( event: any ) => {

            displayEntryError();

        }

    }

    

}