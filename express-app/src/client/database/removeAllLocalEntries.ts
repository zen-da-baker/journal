// Import the indexedDB database
import { database } from "./db.js";

// Import helper functions

// Import helper global variables
import { dayObjectStoreName, dreamObjectStoreName } from "./db.js";

/*
    This helper function removes all of the journal entries from both object stores on 
    the user's local device. This does not remove them from the web server.
*/
export function removeAllLocalEntries(): boolean {

    let dayTransaction: IDBTransaction = database.transaction( dayObjectStoreName, "readwrite" );

    // Open the database with a transaction
    let dreamTransaction: IDBTransaction = database.transaction( dreamObjectStoreName, "readwrite" );

    // Open the desired object store
    let dayObjectStore: IDBObjectStore = dayTransaction.objectStore( dayObjectStoreName );

    let dreamObjectStore: IDBObjectStore = dreamTransaction.objectStore( dreamObjectStoreName );

    // Perform the action on the database which is to save the journal entry
    dayObjectStore.clear(); 

    dreamObjectStore.clear();

    return true;

}