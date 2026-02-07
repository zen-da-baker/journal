import { getListOfDreamEntries } from "../getListOfDreamEntries.js";

import { monthsList } from "../monthsList.js";

export function displayDreamEntries( entryType: string ) {

    const dreamEntryGalleryUI = document.getElementById("dream-entry-gallery");

    let listOfDreamEntries = getListOfDreamEntries();

    if ( listOfDreamEntries !== null ) {

        // Reconstruct the list when this display function is called
        dreamEntryGalleryUI.innerHTML = "";

        listOfDreamEntries.forEach( ( entry: any ) => {

            let newDOMJournalEntryCard = document.createElement("div");

            newDOMJournalEntryCard.className = "card";

            newDOMJournalEntryCard.id = entry.id;

            let titleElementUI = document.createElement("h3");

            titleElementUI.textContent = entry.title;

            let dateElementUI = document.createElement("p");

            let linkElementUI = document.createElement("a");

            linkElementUI.href = "/dashboard/journal-entry?entryId=" + entry.id;

            let linkButtonUI = document.createElement("button");

            linkButtonUI.textContent = entry.title;

            linkElementUI.appendChild( linkButtonUI );

            let entryDate = new Date( entry.createdOn );

            dateElementUI.textContent = monthsList[ entryDate.getMonth() ] + " " + entryDate.getDate() + ", " + entryDate.getFullYear();

            newDOMJournalEntryCard.appendChild( titleElementUI );

            newDOMJournalEntryCard.appendChild( dateElementUI );

            newDOMJournalEntryCard.appendChild( linkElementUI );

            dreamEntryGalleryUI.appendChild( newDOMJournalEntryCard );

        })

    }
    
}