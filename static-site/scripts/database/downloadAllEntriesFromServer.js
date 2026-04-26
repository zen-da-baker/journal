// Import the indexedDB database
import { database } from "./db.js";
// Import helper functions
// Import helper global variables
import { dayObjectStoreName, dreamObjectStoreName } from "./db.js";
/*
    This helper function downloads all existing journal entries from the web server. If the web server
    does not already have journal entries, simply nothing is added to the local device.
    If nothing was already on this device, nothing is added to the web server.
    This function expects a user account of which the token is used for validation.
*/
export async function downloadAllEntriesFromServer() {
    let userToken = localStorage.getItem("bytesized-journal-token");
    if (userToken === null) {
        return false;
    }
    // The network request is made first 
    const initialResponse = await fetch("/settings/all-entries?token=" + userToken);
    const responseBody = await initialResponse.json();
    if (!initialResponse.ok) {
        console.log(initialResponse);
        return false;
    }
    console.log(initialResponse);
    console.log("Now adding downloaded journal entries to local device.");
    // The response body would contain a message and a list of entries 
    const listOfJournalEntries = responseBody.journalEntries;
    // If the network returns the list of journal entries, they are each added to the indexedDB database
    listOfJournalEntries.forEach((entryToSave) => {
        // Determine which object store will be used based on the journal entry type
        let storeName;
        if (entryToSave.type === "day") {
            storeName = dayObjectStoreName;
        }
        else {
            storeName = dreamObjectStoreName;
        }
        if (database !== null) {
            // Open the database with a transaction
            let entryTransaction = database.transaction(storeName, "readwrite");
            // Open the desired object store
            let entryObjectStore = entryTransaction.objectStore(storeName);
            // Perform the action on the database which is to save the journal entry
            entryObjectStore.add(entryToSave);
        }
    });
    return true;
}
