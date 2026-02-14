// Import helper functions
import { EntryModel } from "../../../models/EntryModel.js";
import { addEntryToDB } from "../../../database/addEntryToDB.js";
import { addEntryToList } from "../../add-entries/addEntryToList.js";
import { displayCalendarDaysGrid } from "./displayCalendarDaysGrid.js";
import { getListOfJournalEntries } from "../../getListOfJournalEntries.js";

export function addJournalEntryCalendarDayButton( 
    calendarDayUI: HTMLElement, 
    calendarButtonUI: HTMLButtonElement, 
    selectedDay: number, 
    selectedMonth: number, 
    selectedYear: number 
) {

    let newEntryModalUI = document.querySelector("dialog");

    // The calendar button press opens the modal and allows some options for the user
    calendarButtonUI.onclick = () => {

        // Show the modal, then gather the elements after the modal is shown
        newEntryModalUI.showModal();

        // Get the cancel button and simply close the modal if it is clicked 
        let cancelButtonUI = document.getElementById("cancel-new-journal-entry");

        cancelButtonUI.onclick = () => {

            newEntryModalUI.close();

        }

        // Get the selection type which defaults to day and create a new journal entry when the confirm button is pressed
        let journalEntryTypeSelectionUI = document.querySelector("select");

        let confirmButtonUI = document.getElementById("confirm-new-journal-entry");

        confirmButtonUI.onclick = () => {

            // Get the selected entry type of the selection HTML element
            let selectedEntryType = journalEntryTypeSelectionUI.value;

            // Create a new instance of the entry class with the selected type
            let newEntry = new EntryModel( selectedEntryType );

            // Create a date object and set it to be the selected date
            let entryDateSelected = new Date();

            entryDateSelected.setDate( selectedDay );

            entryDateSelected.setMonth( selectedMonth );

            entryDateSelected.setFullYear( selectedYear );

            // Assign the date to the entry object
            let selectedDateString = entryDateSelected.toString();

            newEntry.createdOn = selectedDateString;

            // Save the new entry to the database
            addEntryToDB( newEntry );

            // Save the new entry to list of entries
            addEntryToList( newEntry );

            // Get the current lists of entries
            let dayEntriesList = getListOfJournalEntries("day");

            let dreamEntriesList = getListOfJournalEntries("dream");

            // The modal will be closed after all of the operations take place
            newEntryModalUI.close();

            // Update the calendar display with the new data
            displayCalendarDaysGrid( selectedMonth, selectedYear, dayEntriesList, dreamEntriesList );

        }

    }

    calendarDayUI.appendChild( calendarButtonUI );

}