import { displayCalendarDaysGrid } from "./calendar-display/displayCalendarDaysGrid.js";
import { displayCalendarDaysDates } from "./calendar-display/displayCalendarDaysDates.js";
import { monthsList } from "../monthsList.js";

let currentDate: Date = new Date();

let selectedMonth: number = currentDate.getMonth();

let selectedYear: number = currentDate.getFullYear();

let previousMonthButton = document.getElementById("previous-month-button");
let nextMonthButton = document.getElementById("next-month-button");

displayCalendarDaysGrid( selectedMonth, selectedYear );
displayCalendarDaysDates( selectedMonth, selectedYear );

// If the user clicks on the month cycle button, it will increment the month or year
nextMonthButton.onclick = () => {

    // Increment the month number
    selectedMonth++;

    // If the month was already Dec, then it will be assigned to January and the year will be incremented
    if ( selectedMonth === 12 ) {

        selectedYear++;

        selectedMonth = 0;

    }

    displayCalendarDaysGrid( selectedMonth, selectedYear );

    displayCalendarDaysDates( selectedMonth, selectedYear );
    
}