// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

// Import database helpers
import { database } from "../../database/db.js";
import { dayObjectStoreName } from "../../database/db.js";

/*
    This helper function updates the database record for the day journal entries
*/
export function updateExistingDayEntry( entryToSave: DayEntryModel ) {

    // Open a transaction with the database with writing permission
    let dayEntryTransaction = database.transaction( dayObjectStoreName, "readwrite" );

    // Get the object store from the store name on the transaction
    let dayObjectStore = dayEntryTransaction.objectStore( dayObjectStoreName );

    // Write the newer journal entry object to the database
    let writeAttempt = dayObjectStore.put( entryToSave );

    writeAttempt.onsuccess = () => console.log("Entry saved to database");

}