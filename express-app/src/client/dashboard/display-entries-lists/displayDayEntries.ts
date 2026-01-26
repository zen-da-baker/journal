import { getListOfDayEntries } from "../getListOfDayEntries.js";

import { monthsList } from "../monthsList.js";

export function displayDayEntries() {

    const dayEntryGalleryUI = document.getElementById("day-entry-gallery");

    let listOfDayEntries = getListOfDayEntries();

    if ( listOfDayEntries !== null ) {

        // Clear the existing HTML and rebuild the section
        dayEntryGalleryUI.innerHTML = "";

        listOfDayEntries.forEach( ( entry: any ) => {

            let newDOMJournalEntryCard = document.createElement("div");

            newDOMJournalEntryCard.className = "card";

            newDOMJournalEntryCard.id = entry.id;

            let titleElementUI = document.createElement("h3");

            titleElementUI.textContent = entry.title;

            let dateElementUI = document.createElement("p");

            let entryDate = new Date( entry.createdOn );

            dateElementUI.textContent = monthsList[ entryDate.getMonth() ] + " " + entryDate.getDate() + ", " + entryDate.getFullYear();

            let linkElementUI = document.createElement("a");

            linkElementUI.href = "/dashboard/day-entry?entryId=" + entry.id;

            let linkButtonUI = document.createElement("button");

            linkButtonUI.textContent = entry.title;

            linkElementUI.appendChild( linkButtonUI );

            newDOMJournalEntryCard.appendChild( titleElementUI );

            newDOMJournalEntryCard.appendChild( dateElementUI );

            newDOMJournalEntryCard.appendChild( linkElementUI );

            dayEntryGalleryUI.appendChild( newDOMJournalEntryCard );

        })

    }
    
}