// Import helper functions
import { getListOfJournalEntries } from "../getListOfJournalEntries.js";

import { monthsList } from "../monthsList.js";

import { removeDayEntryFromDisplay } from "../remove-entry/removeJournalEntryFromDisplay.js";

// This helper function displays the journal entry card on the dashboard as a gallery, taking in the type of entry to display
export function displayJournalEntries( entryType: string = "day" ) {

    // The journal entry gallery to display is determined by the type in the parameter
    const journalEntryGalleryUI = document.getElementById( entryType + "-entry-gallery");

    // Get the list of of journal entries based on the type loaded
    let listOfJournalEntries: Array<any> | null = getListOfJournalEntries( entryType );

    // If the entries exists, proceed with the following
    if ( listOfJournalEntries !== null ) {

        console.log( listOfJournalEntries );

        // Clear the existing HTML and rebuild the section
        journalEntryGalleryUI.innerHTML = "";

        // For each entry in the list, display it as a card
        listOfJournalEntries.forEach( ( entry: any, index: number ) => {

            // The new card element is created programmatically 
            let newDOMJournalEntryCard = document.createElement("div");

            // The HTML class of the card is the card element
            newDOMJournalEntryCard.className = "card";

            // The element ID is assigned to the data id string
            newDOMJournalEntryCard.id = entry.id;

            // Create the heading element that will be displayed on the card
            let titleElementUI = document.createElement("h3");

            // The title is assigned to the page element
            titleElementUI.textContent = entry.title;

            let dateElementUI = document.createElement("p");

            let entryDate = new Date( entry.createdOn );

            dateElementUI.textContent = monthsList[ entryDate.getMonth() ] + " " + entryDate.getDate() + ", " + entryDate.getFullYear();

            // The link to the entry is created and holds a query parameter that contains the entry id which is needed for the next page
            let linkElementUI = document.createElement("a");

            /* 
                Some deeper implimentation notes for the next page to work properly:
                The link to the entry will contain query parameters. The first key is the id for the entry that will
                be used to look for the user created data from the indexedDB object store. This is needed because the 
                user created entry can surpass the localStorage 5MB limit as well as contain files to store such as images.
                The second key is the entry type which determines which object store is searched and the styling of the page.
            */
            linkElementUI.href = "/dashboard/journal-entry?entryId=" + entry.id + "&entryType=" + entryType;

            let linkButtonUI = document.createElement("button");

            let deleteButtonUI = document.createElement("button");

            deleteButtonUI.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>`

            // Get the delete entry modal and its related elements from the DOM
            let deleteModalUI: HTMLDialogElement = document.querySelector("dialog");

            let closeDeleteModalUI = document.getElementById("close-entry-delete-dialogue");

            let deleteModalDeleteButtonUI = document.getElementById("finalize-delete-button");

            let deleteWarningUI = document.getElementById("delete-warning");

            // When the deletion button is clicked on an entry card, the modal is shown along with customized information
            deleteButtonUI.onclick = () => {
                
                // The modal is shown
                deleteModalUI.showModal();

                // The heading of the modal displays a customized message
                deleteWarningUI.textContent = "Are you sure you want to remove " + entry.title + "?";

                // When the final delete button is pressed, the element is removed from the DOM and the modal is closed
                deleteModalDeleteButtonUI.onclick = () => {
                    
                    removeDayEntryFromDisplay( entry.id, index, entry.type );

                    deleteModalUI.close();
                
                };
            
            }

            // The modal can be closed without any action taken
            closeDeleteModalUI.onclick = () => deleteModalUI.close();

            linkButtonUI.textContent = entry.title;

            // The elements are all added to the DOM
            linkElementUI.appendChild( linkButtonUI );

            let buttonContainerUI = document.createElement("div");

            buttonContainerUI.className = "flex space-between";

            // A container that will hold the button that opens the journal entry and the delete button
            buttonContainerUI.appendChild( linkElementUI );

            buttonContainerUI.appendChild( deleteButtonUI );

            newDOMJournalEntryCard.appendChild( titleElementUI );

            newDOMJournalEntryCard.appendChild( dateElementUI );

            // newDOMJournalEntryCard.appendChild( linkElementUI );

            // newDOMJournalEntryCard.appendChild( deleteButtonUI );

            // Add the button container to the card being displayed
            newDOMJournalEntryCard.appendChild( buttonContainerUI );

            journalEntryGalleryUI.appendChild( newDOMJournalEntryCard );

        })

    }
    
}