// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

// Import helper functions
import { getListOfDayEntries } from "../getListOfDayEntries.js";

// Import list name
import { dayEntriesListName } from "../getListOfDayEntries.js";

export function addDayEntryToList( entry: DayEntryModel ) {

    // Get the list of entries from the helper function
    let listOfDayEntries: Array<any> | null = getListOfDayEntries();

    // Create a simplified item listing for simply recalling the full entry later 
    let listItem = {

        id: entry.id,

        title: entry.title,

        createdOn: entry.createdOn

    }

    // If the entries list contains values, add the new entry to it
    if ( listOfDayEntries !== null ) {

        // Add the new entry to the list 
        listOfDayEntries.unshift( listItem );

        let listString = JSON.stringify( listOfDayEntries );

        localStorage.setItem( dayEntriesListName, listString );

    }

    if ( listOfDayEntries === null ) {

        listOfDayEntries = [];

        listOfDayEntries.unshift( listItem );

        let listString = JSON.stringify( listOfDayEntries );

        localStorage.setItem( dayEntriesListName, listString );

    }

}