// Import data models
import { EntryModel } from "../../models/EntryModel.js";

// Import database helpers
import { database } from "../../database/db.js";
import { dayObjectStoreName, dreamObjectStoreName } from "../../database/db.js";

/*
    This helper function updates the database record for the day journal entries
*/
export function updateExistingEntry( entryToSave: EntryModel ) {

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