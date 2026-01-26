import { getListOfDayEntries } from "./getListOfDayEntries.js";

import { monthsList } from "./monthsList.js";

export function displayDayEntries() {

    const dayEntryGalleryUI = document.getElementById("day-entry-gallery");

    let listOfDayEntries = getListOfDayEntries();

    if ( listOfDayEntries !== null ) {

        listOfDayEntries.forEach( ( entry: any ) => {

            let newDOMJournalEntryCard = document.createElement("div");

            newDOMJournalEntryCard.className = "card";

            newDOMJournalEntryCard.id = entry.id;

            let titleElementUI = document.createElement("h3");

            titleElementUI.textContent = entry.title;

            let dateElementUI = document.createElement("p");

            let entryDate = new Date( entry.date );

            dateElementUI.textContent = monthsList[ entryDate.getMonth() ] + " " + entryDate.getDay() + ", " + entryDate.getFullYear();

            newDOMJournalEntryCard.appendChild( titleElementUI );

            newDOMJournalEntryCard.appendChild( dateElementUI );

            dayEntryGalleryUI.appendChild( newDOMJournalEntryCard );

        })
    }

    
}