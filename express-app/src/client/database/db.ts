let databaseName = "bytesized-journal-database";

let databaseVersion = 1;

let dayObjectStoreName = "bytesized-journal-day-entries";

let dreamObjectStoreName = "bytesized-journal-dream-entries";

let request = indexedDB.open( databaseName, databaseVersion );

let database;

function onRequestSuccess( event: any ) {

    database = event.target.result; 

}

function createDatabase( event: any ) {

    let db = event.target.result;

    const dayEntriesObjectStore = db.createObjectStore( dayObjectStoreName, { keyPath: "id" } );

    dayEntriesObjectStore.createIndex( "title", "title", { unique: false } );

    dayEntriesObjectStore.createIndex( "createdOn", "createdOn", { unique: true } );

    const dreamEntriesObjectStore = db.createObjectStore( dreamObjectStoreName, { keyPath: "id" } );

    dreamEntriesObjectStore.createIndex( "title", "title", { unique: false } );

    dreamEntriesObjectStore.createIndex( "createdOn", "createdOn", { unique: true } );

}

request.onerror = ( error: any ) => console.log( error );

request.onsuccess = onRequestSuccess;

request.onupgradeneeded = createDatabase;

export { database, dayObjectStoreName, dreamObjectStoreName };