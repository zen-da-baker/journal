// Import data models
import { DayEntryModel } from "../../models/DayEntryModel.js";

// Import helper functions
import { monthsList } from "../monthsList.js";

// This helper function sets the date DOM element text
export function displayEntryDate( entry: DayEntryModel ) {

    // Get the date DOM element 
    let entryDateUI = document.getElementById("entry-date");

    // Recreate the date object using the stored date string
    let entryDate = new Date( entry.createdOn );

    // Get the month number and the day number
    let monthNumber = entryDate.getMonth();

    let dateNumber = entryDate.getDate();

    // Based on the day number, set the day exponent, the default being "th"
    let dayExponent: string = "th";

    if ( dateNumber === 1 || dateNumber === 21 || dateNumber === 31 ) {

        dayExponent = "st";

    }

    if ( dateNumber === 2 || dateNumber === 22 ) {

        dayExponent = "nd";

    }

    if ( dateNumber === 3 || dateNumber === 23 ) {

        dayExponent = "rd";

    }

    // Get the year number
    let yearNumber = entryDate.getFullYear();

    // Get the month name based on the month number
    let currentMonthName = monthsList[ monthNumber ];

    // Concatenate all of the relevant information into the string that will be displayed on the page
    let dateDisplay: string = currentMonthName + " " + dateNumber + dayExponent + ", " + yearNumber;

    // Display the date on the page as a formatted string
    entryDateUI.textContent = dateDisplay;

}