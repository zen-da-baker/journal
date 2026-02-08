// Import data models
import { EntryModel } from "../../models/EntryModel.js";

// Import helper functions
import { addEntryToList } from "./addEntryToList.js";
import { addEntryToDB } from "../../database/addEntryToDB.js";
import { displayJournalEntries } from "../display-entries-lists/displayJournalEntries.js";

export function addJournalEntry( newEntryType: string ): void {

    // Create the new entry data model instance
    let newEntry = new EntryModel( newEntryType, "Untitled Entry");

    // Add the core information to the list of entries
    addEntryToList( newEntry );

    // Save the instance to the database
    addEntryToDB( newEntry );

    // Update the UI display
    displayJournalEntries();

}