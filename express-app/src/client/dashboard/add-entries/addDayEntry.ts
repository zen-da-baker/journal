// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

// Import helper functions
import { addDayEntryToList } from "./addDayEntryToList.js";

import { addDayEntryToDB } from "../../database/addDayEntryToDB.js";

import { displayDayEntries } from "../display-entries-lists/displayDayEntries.js";

export function addDayEntry() {

    // Create the new entry data model instance
    let newDayEntry = new DayEntryModel("Untitled Entry");

    // Add the core information to the list of entries
    addDayEntryToList( newDayEntry );

    // Save the instance to the database
    addDayEntryToDB( newDayEntry );

    // Update the UI display
    displayDayEntries();

}