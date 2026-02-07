// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

// Import helper functions
import { updateExistingDayEntry } from "../update-entries/updateExistingDayEntry.js";
import { dayEntriesListName } from "../getListOfJournalEntries.js";
import { dreamEntriesListName } from "../getListOfDreamEntries.js";

/*
    This helper functions evaluates the title of a journal entry and the current HTML element and saves the 
    entry if the current value is not the same as the existing entry object.
*/
export function handleTitleEdit( entryToSave: DayEntryModel, currentTitleValue: string, type: string ) {

    // Determine the entry type which determines which list to use for local storage and the indexedDB object store
    let entryListName = dayEntriesListName;

    if ( type === "dream" ) {

        entryListName = dreamEntriesListName;

    }

    // Get the entries list JSON string from the local storage 
    let entriesListString = localStorage.getItem( entryListName );

    // If the entry title and the selected text do not match, set the entry title and save it to the indexedDB database
    if ( entryToSave.title !== currentTitleValue ) {

        // Assign the title value and save the entry
        entryToSave.title = currentTitleValue;

        // Update the page title element as well 
        let pageTitle = document.querySelector("title");

        pageTitle.textContent = currentTitleValue + " | Bytesized Journal";

        // Update the new title in the indexedDB database
        updateExistingDayEntry( entryToSave );

    }

    if ( entriesListString !== null ) {

        let entriesList: any = JSON.parse( entriesListString );

        let entryIndex: number = entriesList.findIndex( ( entrySearchItem: any ) => {

            // If the entry has a matching ID, it was found
            if ( entrySearchItem.id === entryToSave.id ) {

                return true;

            } else {

                return false;

            }

        })

        // If the entry was found, assign its title to the current title
        if ( entryIndex !== -1 ) {

            entriesList[ entryIndex ].title = currentTitleValue;

            // After assigning the entry title, convert the list to a JSON string again and set it in local storage
            entriesListString = JSON.stringify( entriesList );

            localStorage.setItem( entryListName, entriesListString );

        }

        // If the entry was not found, it will be created if the list already exists

        // If the list does not exist, a list will be created

    }

}