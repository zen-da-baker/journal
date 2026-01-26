// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

// Import database helpers
import { database } from "./db.js";

import { dayObjectStoreName } from "./db.js";

export function addDayEntryToDB( entryToSave: DayEntryModel ) {

    let writeOption = "readwrite";

    let dayEntryTransaction = database.transaction( dayObjectStoreName, writeOption );

    let dayEntryObjectStore = dayEntryTransaction.objectStore( dayObjectStoreName );

    dayEntryObjectStore.add( entryToSave );

}