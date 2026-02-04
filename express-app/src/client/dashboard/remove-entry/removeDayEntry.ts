import { database } from "../../database/db.js";

import { dayObjectStoreName } from "../../database/db.js";

export function removeDayEntry( entryId: string ) {

    let dayObjectStoreTransaction = database.transaction( dayObjectStoreName, "readwrite" );

    let dayObjectStore = dayObjectStoreTransaction.objectStore( dayObjectStoreName );

    dayObjectStore.delete( entryId );

}