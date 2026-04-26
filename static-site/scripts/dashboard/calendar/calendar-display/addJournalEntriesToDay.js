export function addJournalEntriesToDay(calendarDayUI, calendarDay, calendarMonth, calendarYear, dayEntriesList, dreamEntriesList) {
    function journalEntryListCheck(entry, entryType) {
        let entryDate = new Date(entry.createdOn);
        if (entryDate.getDate() === calendarDay
            &&
                entryDate.getMonth() === calendarMonth
            &&
                entryDate.getFullYear() === calendarYear) {
            // Begin the creation of the journal entry card to be displayed on the calendar day
            let entryCalendarCardUI = document.createElement("div");
            entryCalendarCardUI.className = "card flex";
            entryCalendarCardUI.style.flexDirection = "column";
            if (entry.type === "dream") {
                entryCalendarCardUI.className += " dream-card";
            }
            let entryCardTitleUI = document.createElement("span");
            let entryCardLink = document.createElement("a");
            let entryCardButton = document.createElement("button");
            entryCardButton.style.width = "100%";
            // Assign the properties of the new calendar card element
            entryCardTitleUI.textContent = entry.title;
            entryCardLink.href = "../dashboard/journalEntry.html?entryId=" + entry.id + "&entryType=" + entryType;
            entryCardButton.textContent = "Open";
            // Add the calendar card element to the current calendar day entry
            entryCardLink.appendChild(entryCardButton);
            entryCalendarCardUI.appendChild(entryCardTitleUI);
            entryCalendarCardUI.appendChild(entryCardLink);
            calendarDayUI.appendChild(entryCalendarCardUI);
        }
    }
    if (dayEntriesList.length !== 0) {
        dayEntriesList.forEach((entry) => journalEntryListCheck(entry, "day"));
    }
    if (dreamEntriesList.length !== 0) {
        dreamEntriesList.forEach((entry) => journalEntryListCheck(entry, "dream"));
    }
}
