// Import data models
import { EntryModel } from "../models/EntryModel.js";

// Import database helpers
import { database } from "./db.js";

import { dayObjectStoreName, dreamObjectStoreName } from "./db.js";

export function addEntryToDB( entryToSave: EntryModel ) {

    // Determine which object store will be used based on the journal entry type
    let storeName: string;

    if ( entryToSave.type === "day" ) {

        storeName = dayObjectStoreName;

    } else {

        storeName = dreamObjectStoreName;

    }

    // If the database exists
    if ( database !== null ) {

        // Open the database with a transaction
        let entryTransaction: IDBTransaction = database.transaction( storeName, "readwrite" );

        // Open the desired object store
        let entryObjectStore: IDBObjectStore = entryTransaction.objectStore( storeName );

        // Perform the action on the database which is to save the journal entry
        entryObjectStore.add( entryToSave );

    }
    
}