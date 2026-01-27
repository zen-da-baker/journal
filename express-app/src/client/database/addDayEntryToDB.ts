// Import data models
import { DayEntryModel } from "../models/DayEntryModel.js";

// Import database helpers
import { database } from "./db.js";

import { dayObjectStoreName } from "./db.js";

export function addDayEntryToDB( entryToSave: DayEntryModel ) {

    if ( database !== null ) {

        let dayEntryTransaction = database.transaction( dayObjectStoreName, "readwrite" );

        let dayEntryObjectStore = dayEntryTransaction.objectStore( dayObjectStoreName );

        dayEntryObjectStore.add( entryToSave );

    }
    
}