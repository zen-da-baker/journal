// Import data models
import { DreamEntryModel } from "../../models/DreamEntryModel.js";

// Import database helpers
import { database } from "./db.js";

import { dreamObjectStoreName } from "./db.js";

export function addDreamEntryToDB( entryToSave: DreamEntryModel ) {

    let writeOption = "readwrite";

    let dreamEntryTransaction = database.transaction( dreamObjectStoreName, writeOption );

    let dreamEntryObjectStore = dreamEntryTransaction.objectStore( dreamObjectStoreName );

    dreamEntryObjectStore.add( entryToSave );
    
}