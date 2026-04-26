// Import database helpers
import { database, dayObjectStoreName, dreamObjectStoreName } from "../../database/db.js";
// Import helper functions
import { displayJournalEntry } from "../display-entry/displayJournalEntry.js";
import { displayEntryError } from "../display-entry/displayEntryError.js";
export async function getJournalEntryData(entryId, entryType) {
    // If the entry ID or type in the URL do not exist, this function will not execute and avoids a runtime error
    if (entryId === null || entryType === null) {
        return;
    }
    // If the data sync option is offline, perform the following
    let dataSyncOption = localStorage.getItem("bytesized-journal-data-sync-selection");
    if (dataSyncOption === null || dataSyncOption === "offline only" || dataSyncOption === "offline and online") {
        // If the database wasn't connected yet, try again after one second
        if (database === undefined) {
            console.log("Attempting to connect to stored data.");
            // Set a timer for one second and execute the connection again
            setTimeout(() => getJournalEntryData(entryId, entryType), 100);
        }
        // If the database has been connected now
        if (database !== null && database !== undefined) {
            let objectStoreName = dayObjectStoreName;
            if (entryType === "day") {
                objectStoreName = dayObjectStoreName;
            }
            else {
                objectStoreName = dreamObjectStoreName;
            }
            let dayEntryTransaction = database.transaction(objectStoreName, "readonly");
            let dayObjectStore = dayEntryTransaction.objectStore(objectStoreName);
            let retrievalRequest = dayObjectStore.get(entryId);
            retrievalRequest.onsuccess = (event) => {
                console.log("Stored data accessed successfully.");
                displayJournalEntry(event.target.result);
            };
            retrievalRequest.onerror = (event) => {
                displayEntryError();
            };
        }
    }
    // If the data sync option is online, get it from the web server instead
    if (dataSyncOption === "online only") {
        let tokenString = localStorage.getItem("bytesized-journal-token");
        if (tokenString === null) {
            return;
        }
        const initialResponse = await fetch("/settings/entry?token=" + tokenString + "&entryId=" + entryId);
        const responseBody = await initialResponse.json();
        console.log(responseBody);
        if (initialResponse.ok) {
            displayJournalEntry(responseBody.entry);
        }
    }
}
