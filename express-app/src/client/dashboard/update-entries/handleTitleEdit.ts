// Import data models
import { EntryModel } from "../../models/EntryModel.js";

// Import helper functions
import { updateExistingEntry } from "./updateExistingEntry.js";
import { dayEntriesListName, dreamEntriesListName } from "../getListOfJournalEntries.js";

/*
    This helper functions evaluates the title of a journal entry and the current HTML element and saves the 
    entry if the current value is not the same as the existing entry object.
*/
export function handleTitleEdit( entryToSave: EntryModel, currentTitleValue: string ): void {

    // Determine the entry type which determines which list to use for local storage and the indexedDB object store
    let entryListName: string;
    
    if ( entryToSave.type === "day" ) {

        entryListName = dayEntriesListName;

    } else {

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
        updateExistingEntry( entryToSave );

    }

    if ( entriesListString !== null ) {

        let entriesList: any = JSON.parse( entriesListString );

        console.log( entriesList );

        let entryIndex: number = entriesList.findIndex( ( entrySearchItem: any ) => {

            // If the entry has a matching ID, it was found
            if ( entrySearchItem.id === entryToSave.id ) {

                return true;

            } else {

                return false;

            }

        })

        console.log( entryIndex );

        // If the entry was found, assign its title to the current title
        if ( entryIndex !== -1 ) {

            // Change the title of the element object for the local storage list
            entriesList[ entryIndex ].title = currentTitleValue;

            // After assigning the entry title, convert the list to a JSON string again and set it in local storage
            entriesListString = JSON.stringify( entriesList );

            // Save the local storage list
            localStorage.setItem( entryListName, entriesListString );

        }

        // If the entry was not found, it will be created if the list already exists

        // If the list does not exist, a list will be created

    }

}