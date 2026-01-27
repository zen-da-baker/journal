// Import database helpers
import { database } from "../../database/db.js";

import { dayObjectStoreName } from "../../database/db.js";

// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

export function getDayEntry( id: string ) {

    let result: DayEntryModel;

    // If the database wasn't connected yet, try again after one second
    if ( database === undefined ) {

        console.log("Attempting to connect to stored data.");

        // Set a timer for one second and execute the connection again
        setTimeout( () => getDayEntry( id ), 100 );

    }

    if ( database !== null && database !== undefined ) {

        let dayEntryTransaction = database.transaction( dayObjectStoreName, "readonly" );

        let dayObjectStore = dayEntryTransaction.objectStore( dayObjectStoreName );

        let retrievalRequest = dayObjectStore.get( id );

        retrievalRequest.onsuccess = ( event: any ) => {

            console.log("Stored data accessed successfully.")

            result = event.target.result;

        }

    }

    return result;

}