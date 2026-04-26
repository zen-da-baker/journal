let databaseName = "bytesized-journal-database";
let databaseVersion = 1;
const dayObjectStoreName = "bytesized-journal-day-entries";
const dreamObjectStoreName = "bytesized-journal-dream-entries";
let request = indexedDB.open(databaseName, databaseVersion);
let database;
function onRequestSuccess(event) {
    database = event.target.result;
}
function createDatabase(event) {
    let db = event.target.result;
    const dayEntriesObjectStore = db.createObjectStore(dayObjectStoreName, { keyPath: "id" });
    dayEntriesObjectStore.createIndex("title", "title", { unique: false });
    dayEntriesObjectStore.createIndex("createdOn", "createdOn", { unique: true });
    const dreamEntriesObjectStore = db.createObjectStore(dreamObjectStoreName, { keyPath: "id" });
    dreamEntriesObjectStore.createIndex("title", "title", { unique: false });
    dreamEntriesObjectStore.createIndex("createdOn", "createdOn", { unique: true });
}
request.onerror = (error) => console.log(error);
request.onsuccess = onRequestSuccess;
request.onupgradeneeded = createDatabase;
export { database, dayObjectStoreName, dreamObjectStoreName };
