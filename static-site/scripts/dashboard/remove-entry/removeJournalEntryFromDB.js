// Import database
import { database } from "../../database/db.js";
import { dayObjectStoreName, dreamObjectStoreName } from "../../database/db.js";
// This helper function takes the entry ID and type and uses that to remove the selected entry from it's object store in indexedDB
export async function removeJournalEntryFromDB(entryId, entryType) {
    const dataSyncOption = localStorage.getItem("bytesized-journal-data-sync-selection");
    if (dataSyncOption === null || dataSyncOption === "offline only" || dataSyncOption === "offline and online") {
        // Determine which object store to use based on the entry type
        let objectStoreName;
        if (entryType === "day") {
            objectStoreName = dayObjectStoreName;
        }
        else {
            objectStoreName = dreamObjectStoreName;
        }
        // Create an indexedDB transaction
        let dayObjectStoreTransaction = database.transaction(objectStoreName, "readwrite");
        // Get the object store from the transaction
        let objectStore = dayObjectStoreTransaction.objectStore(objectStoreName);
        // Perform the deletion action
        objectStore.delete(entryId);
    }
    if (dataSyncOption === "online only" || dataSyncOption === "offline and online") {
        let tokenString = localStorage.getItem("bytesized-journal-token");
        if (tokenString === null) {
            return;
        }
        let token = JSON.parse(tokenString);
        const requestBody = {
            entryId, token
        };
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        };
        const initialResponse = await fetch("/settings/entry", requestOptions);
        const responseBody = await initialResponse.json();
        console.log(responseBody);
    }
}
