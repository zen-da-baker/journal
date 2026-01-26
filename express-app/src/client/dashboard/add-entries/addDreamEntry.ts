// Import data models
import { DreamEntryModel } from "../../../models/DreamEntryModel.js";

// Import helper functions
import { addDreamEntryToList } from "./addDreamEntryToList.js";

export function addDreamEntry() {

    // Create the new dream entry instance
    let newDreamEntry = new DreamEntryModel();

    // Add the dream instance to the list
    addDreamEntryToList( newDreamEntry );

}