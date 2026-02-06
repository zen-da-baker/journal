// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

// Import helper functions
import { getEntryLocalStorageIndex } from "../get-entries/getEntryLocalStorageIndex.js";
import { removeDayEntryFromLocalStorage } from "./removeDayEntryFromLocalStorage.js";
import { removeDayEntryFromDB } from "./removeDayEntryFromDB.js";
import { navigateBack } from "../../helpers/navigateBack.js";

// When the user clicks the first delete button, it triggers this prompt function
export function removeCurrentEntryPrompt( entry: DayEntryModel ): void {

    // All of the relevant modal DOM elements are extracted
    let deletionModalUI = document.querySelector("dialog");

    let modalHeadingUI = document.getElementById("modal-heading");

    let closeModalButtonUI = document.getElementById("close-deletion-modal-button");

    let confirmDeletionButtonUI = document.getElementById("confirm-entry-deletion-button");

    // The user will have a customized header in the modal with the entry title displayed 
    modalHeadingUI.textContent = "Are you sure you want to delete " + entry.title;

    // If the user clicks the close button, the modal is closed without any action taken
    closeModalButtonUI.onclick = () => {

        deletionModalUI.close();

    }

    // If the user clicks the confirm deletion button, the final deletion process will begin
    confirmDeletionButtonUI.onclick = () => {

        // The entry index position in local storage is identified
        let entryIndex: number = getEntryLocalStorageIndex( entry.id );

        // The entry is removed from the local storage
        removeDayEntryFromLocalStorage( entryIndex );

        // The entry is removed from the indexedDB database
        removeDayEntryFromDB( entry.id );
        
        // The user is navigated back to the dashboard page which will reflect the entry deletion
        location.href = location.origin + "/dashboard";

    }

    // The modal is now shown after all properties are defined
    deletionModalUI.showModal();

}