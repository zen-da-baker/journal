// Import data models
import { DreamEntryModel } from "../../models/DreamEntryModel.js";

// Import helper functions
import { addDreamEntryToList } from "./addDreamEntryToList.js";

import { addDreamEntryToDB } from "../../database/addDreamEntryToDB.js";

import { displayDreamEntries } from "../display-entries-lists/displayDreamEntries.js";

export function addDreamEntry() {

    // Create the new dream entry instance
    let newDreamEntry = new DreamEntryModel("Untitled Entry");

    // Add the dream instance to the list
    addDreamEntryToList( newDreamEntry );

    addDreamEntryToDB( newDreamEntry );

    // Update the UI display
    displayDreamEntries();

}