// Import data models
import { EntryModel } from "../../models/EntryModel.js";
import { Token } from "../../models/Token.js";

// Import database helpers
import { database } from "../../database/db.js";
import { dayObjectStoreName, dreamObjectStoreName } from "../../database/db.js";

/*
    This helper function updates the database record for the day journal entries.
    It will store entries on the local device if desired or on the web server based
    on the selection type. The web server will validate the submitted token and entries.
*/
export async function updateExistingEntry( entryToSave: EntryModel ) {

    const dataSyncOption: string | null = localStorage.getItem("bytesized-journal-data-sync-selection");

    if ( dataSyncOption === null || dataSyncOption === "offline only" || dataSyncOption === "offline and online" ) {

        // Use either object store name based on if this is a day entry or a dream entry
        let objectStoreName: string;

        if ( entryToSave.type === "day" ) {

            objectStoreName = dayObjectStoreName;

        } else {

            objectStoreName = dreamObjectStoreName;

        }

        // Open a transaction with the database with writing permission
        let entryTransaction = database.transaction( objectStoreName, "readwrite" );

        // Get the object store from the store name on the transaction
        let objectStore = entryTransaction.objectStore( objectStoreName );

        // Write the newer journal entry object to the database
        let writeAttempt = objectStore.put( entryToSave );

        // If the write attempt is successful, log the success message to the console
        writeAttempt.onsuccess = () => console.log( "Entry " + entryToSave.title + " saved to the database." );

    }

    if ( dataSyncOption === "online only" || dataSyncOption === "offline and online" ) {

        let tokenString: string | null = localStorage.getItem("bytesized-journal-token");

        if ( tokenString === null ) {

            return;

        }

        let token: Token = JSON.parse( tokenString );

        const requestBody = {

            entry: entryToSave,

            token

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

        console.log( responseBody );

        if ( initialResponse.ok ) {

            return true;

        }

        return false;

    }

}