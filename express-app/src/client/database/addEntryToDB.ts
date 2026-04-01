// Import data models
import { EntryModel } from "../models/EntryModel.js";

// Import database helpers
import { database } from "./db.js";

import { dayObjectStoreName, dreamObjectStoreName } from "./db.js";

export async function addEntryToDB( entryToSave: EntryModel ): Promise<boolean> {

    // Determine which object store will be used based on the journal entry type
    let storeName: string;

    if ( entryToSave.type === "day" ) {

        storeName = dayObjectStoreName;

    } else {

        storeName = dreamObjectStoreName;

    }

    const dataSyncOption: string | null = localStorage.getItem("bytesized-journal-data-sync-selection");

    // If offline or both offline and online
    if ( database !== null ) {

        if ( dataSyncOption === null || dataSyncOption === "offline only" || dataSyncOption === "offline and online" ) {

            // Open the database with a transaction
            let entryTransaction: IDBTransaction = database.transaction( storeName, "readwrite" );

            // Open the desired object store
            let entryObjectStore: IDBObjectStore = entryTransaction.objectStore( storeName );

            // Perform the action on the database which is to save the journal entry
            entryObjectStore.add( entryToSave );
    
        }

    }

    // If both offline and online or just online only 
    if ( dataSyncOption === "online only" || dataSyncOption === "offline and online" ) {

        let tokenString = localStorage.getItem("bytesized-journal-token");

        if ( tokenString === null ) {

            return;

        }

        let token = JSON.parse( tokenString );

        // The journal entry is synced with the database through a PUT request and requires the token for validation
        const requestBody = {

            token,

            entry: entryToSave

        }

        const requestOptions = {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify( requestBody )

        }

        const initialResponse = await fetch( "/settings/entry", requestOptions );

        const responseBody = await initialResponse.json();

        if ( initialResponse.ok ) {

            return true;

        }

        return false;

    }
    
}