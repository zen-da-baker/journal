export function addJournalEntriesToDay( 
    calendarDayUI: HTMLElement, 
    calendarDay: number,
    calendarMonth: number,
    calendarYear: number,
    dayEntriesList: Array<any>, 
    dreamEntriesList: Array<any> 
): void {

    function journalEntryListCheck( entry: any, entryType: string ) {

        let entryDate = new Date( entry.createdOn );

        if ( 
            entryDate.getDate() === calendarDay 
            && 
            entryDate.getMonth() === calendarMonth 
            && 
            entryDate.getFullYear() === calendarYear 
        ) {

            // Begin the creation of the journal entry card to be displayed on the calendar day
            let entryCalendarCardUI = document.createElement("div");

            let entryCardTitleUI = document.createElement("h3");

            let entryCardLink = document.createElement("a");

            let entryCardButton = document.createElement("button");

            // Assign the properties of the new calendar card element
            entryCardTitleUI.textContent = entry.title;

            entryCardLink.href = "/dashboard/journal-entry?entryId=" + entry.id + "&entryType=" + entryType;

            entryCardButton.textContent = "Open Entry";

            // Add the calendar card element to the current calendar day entry
            entryCardLink.appendChild( entryCardButton );

            entryCalendarCardUI.appendChild( entryCardTitleUI );

            entryCalendarCardUI.appendChild( entryCardLink );

            calendarDayUI.appendChild( entryCalendarCardUI );

        }

    }

    if ( dayEntriesList.length !== 0 ) {

        dayEntriesList.forEach( ( entry: any ) => journalEntryListCheck( entry, "day") );

    }

    if ( dreamEntriesList.length !== 0 ) {

        dreamEntriesList.forEach( ( entry: any ) => journalEntryListCheck( entry, "dream" ) );

    }

}