import { monthsList } from "../../monthsList.js";

export function displayCalendarDaysDates(): void {

    let monthNameUI = document.getElementById("month-name");

    let yearNumberUI = document.getElementById("year-number");

    let currentDate = new Date();

    let firstDayOfTheMonth = new Date( currentDate.toString() );

    firstDayOfTheMonth.setDate( 1 );

    firstDayOfTheMonth.setMonth( 4 );

    let firstDayPosition = firstDayOfTheMonth.getDay();

    monthNameUI.textContent = monthsList[ firstDayOfTheMonth.getMonth() ];

    yearNumberUI.textContent = firstDayOfTheMonth.getFullYear().toString();

    // Limit for when to end the days display on the calendar
    let dayCount = 0;

    let monthMax = 31;

    for ( let outerIterator = 0; outerIterator < 6; outerIterator++ ) {

        for ( let innerIterator = 0; innerIterator < 7; innerIterator++ ) {

            let calendarDayUI = document.getElementById("day-row-" + outerIterator + "-column-" + innerIterator );

            if ( firstDayPosition === innerIterator && outerIterator === 0 ) {

                calendarDayUI.textContent = firstDayOfTheMonth.getDate().toString();

                dayCount += 1;

            }

            if ( dayCount > 0 && dayCount < monthMax + 1 ) {

                calendarDayUI.textContent = dayCount.toString();

                dayCount++;

            }

        }
    }

}