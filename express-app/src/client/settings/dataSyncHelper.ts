// Import helper functions
import { downloadAllEntriesFromServer } from "../database/downloadAllEntriesFromServer.js";
import { uploadAllEntriesToServer } from "../database/uploadAllEntriesToServer.js";

// DOM elements
const dataSyncSelectionUI = document.getElementById("data-sync-selection") as HTMLSelectElement;

export async function dataSyncHelper( originalDataSyncSelection: string ) {

    let selectedValue = dataSyncSelectionUI.value;

    // If the selection and the existing selection are the same, no action is taken
    if ( selectedValue === originalDataSyncSelection ) {

        return;

    }

    // First, the selected value is added to the local storage
    localStorage.setItem( "bytesized-journal-data-sync-selection", selectedValue );

    // The offline and online selection download any existing journal entries on the web server and uploads local entries
    if ( selectedValue === "offline and online" ) {

        downloadAllEntriesFromServer();

        uploadAllEntriesToServer();

    }

    // The online only selection uploads existing entries then clears the indexedDB storage
    if ( selectedValue === "online only" ) {

        uploadAllEntriesToServer();

        // Now clear the indexedDB object stores

    }

    // If the selection was offline, the existing entries are downloaded and no longer uploaded to the web server
    if ( selectedValue === "offline only" ) {

        downloadAllEntriesFromServer();

    }

}