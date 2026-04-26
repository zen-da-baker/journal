// Import database helpers
import { database } from "./db.js";
import { dayObjectStoreName } from "./db.js";
export function addDayEntryToDB(entryToSave) {
    if (database !== null) {
        let dayEntryTransaction = database.transaction(dayObjectStoreName, "readwrite");
        let dayEntryObjectStore = dayEntryTransaction.objectStore(dayObjectStoreName);
        dayEntryObjectStore.add(entryToSave);
    }
}
