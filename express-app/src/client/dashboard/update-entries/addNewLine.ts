// Import data models
import { EntryModel } from "../../models/EntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

// Import helper functions
import { updateExistingEntry } from "./updateExistingEntry.js";
import { displayJournalEntry } from "../display-entry/displayJournalEntry.js";

export function addNewLine( entry: EntryModel ): string {

    let nextNewLine = new EntryLineModel("p");
    
    entry.listOfLines.push( nextNewLine );

    updateExistingEntry( entry );

    displayJournalEntry( entry );

    return nextNewLine.id;

}