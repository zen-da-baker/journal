// Import data models
import { EntryModel } from "../../models/EntryModel.js";

// Import helper functions
import { getListOfJournalEntries } from "../getListOfJournalEntries.js";

// Import list name
import { dayEntriesListName, dreamEntriesListName } from "../getListOfJournalEntries.js";

export function addEntryToList( entry: EntryModel ) {

    // Get the list of entries from the helper function
    let listOfEntries: Array<any> | null = getListOfJournalEntries( entry.type );

    // The list name will be determined by the type of entry being added
    let entryListName: string;

    if ( entry.type === "day" ) {

        entryListName = dayEntriesListName;

    } else {

        entryListName = dreamEntriesListName;

    }

    // Create a simplified item listing for simply recalling the full entry later 
    let listItem = {

        id: entry.id,

        title: entry.title,

        createdOn: entry.createdOn

    }

    // If the entries list contains values, add the new entry to it
    if ( listOfEntries !== null ) {

        // Add the new entry to the list 
        listOfEntries.unshift( listItem );

        let listString = JSON.stringify( listOfEntries );

        localStorage.setItem( entryListName, listString );

    }

    // If the entries list does not already exist, it will be created
    if ( listOfEntries === null ) {

        listOfEntries = [];

        listOfEntries.unshift( listItem );

        let listString = JSON.stringify( listOfEntries );

        localStorage.setItem( entryListName, listString );

    }

}