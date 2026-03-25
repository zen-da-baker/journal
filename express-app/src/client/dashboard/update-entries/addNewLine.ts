// Import data models
import { EntryModel } from "../../models/EntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

// Import helper functions
import { updateExistingEntry } from "./updateExistingEntry.js";
import { displayJournalEntry } from "../display-entry/displayJournalEntry.js";

export function addNewLine( entry: EntryModel, selectedLine: number, lineType: string = "p" ): string {

    let nextNewLine = new EntryLineModel( lineType );

    let deleteCount = 0;
    
    entry.listOfLines.splice( selectedLine + 1, deleteCount, nextNewLine );

    updateExistingEntry( entry );

    displayJournalEntry( entry );

    return nextNewLine.id;

}