// Import database helpers
import { database } from "./db.js";
import { dreamObjectStoreName } from "./db.js";
export function addDreamEntryToDB(entryToSave) {
    if (database !== null) {
        let dreamEntryTransaction = database.transaction(dreamObjectStoreName, "readwrite");
        let dreamEntryObjectStore = dreamEntryTransaction.objectStore(dreamObjectStoreName);
        dreamEntryObjectStore.add(entryToSave);
    }
}
