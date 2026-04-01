// Import database
import { database } from "../../database/db.js";

import { dayObjectStoreName, dreamObjectStoreName } from "../../database/db.js";

// Import data models
import { Token } from "../../models/Token.js";

// This helper function takes the entry ID and type and uses that to remove the selected entry from it's object store in indexedDB
export async function removeJournalEntryFromDB( entryId: string, entryType: string ): Promise<void> {

    const dataSyncOption: string | null = localStorage.getItem("bytesized-journal-data-sync-selection");

    if ( dataSyncOption === null || dataSyncOption === "offline only" || dataSyncOption === "offline and online" ) {

        // Determine which object store to use based on the entry type
        let objectStoreName: string;

        if ( entryType === "day" ) {

            objectStoreName = dayObjectStoreName;

        } else {

            objectStoreName = dreamObjectStoreName;

        }

        // Create an indexedDB transaction
        let dayObjectStoreTransaction: IDBTransaction = database.transaction( objectStoreName, "readwrite" );

        // Get the object store from the transaction
        let objectStore: IDBObjectStore = dayObjectStoreTransaction.objectStore( objectStoreName );

        // Perform the deletion action
        objectStore.delete( entryId );

        }
        
        if ( dataSyncOption === "online only" || dataSyncOption === "offline and online" ) {
    
            let tokenString: string | null = localStorage.getItem("bytesized-journal-token");
    
            if ( tokenString === null ) {
    
                return;
    
            }
    
            let token: Token = JSON.parse( tokenString );
    
            const requestBody = {
    
                entryId, entryType, token
    
            }
    
            const requestOptions = {
    
                method: "DELETE",
    
                headers: {
                    "Content-Type": "application/json"
                },
    
                body: JSON.stringify( requestBody )
    
            }
    
            const initialResponse = await fetch( "/settings/entry", requestOptions );
    
            const responseBody = await initialResponse.json();
    
            console.log( responseBody );
    
        }

}