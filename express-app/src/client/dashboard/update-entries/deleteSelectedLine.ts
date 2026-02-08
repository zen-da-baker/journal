// Import data models 
import { EntryModel } from "../../models/EntryModel.js";

// Import helper functions
import { updateExistingEntry } from "./updateExistingEntry.js";

/*
    This helper function removes the selected line from the entry and sets the focus to the previous line.
    This function has no return value. 
    The focus of the line is set by the event listener above this helper function. 
*/
export function deleteSelectedLine( entry: EntryModel, targetIndex: number ): void {

    // Set the delete count which is one item
    let deleteCount = 1;

    // Remove the target line based on the index from the list of lines on the entry
    entry.listOfLines.splice( targetIndex, deleteCount );

    // Save the changes to the database
    updateExistingEntry( entry );

}