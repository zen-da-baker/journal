// Import database
import { database } from "../../database/db.js";

import { dayObjectStoreName, dreamObjectStoreName } from "../../database/db.js";

// This helper function takes the entry ID and type and uses that to remove the selected entry from it's object store in indexedDB
export function removeJournalEntryFromDB( entryId: string, entryType: string ): void {

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