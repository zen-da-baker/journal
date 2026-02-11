import { monthsList } from "../../monthsList.js";

export function displayCalendarDaysDates( selectedMonth: number, selectedYear: number ): void {

    let monthNameUI = document.getElementById("month-name");

    let yearNumberUI = document.getElementById("year-number");

    let currentDate = new Date();

    let firstDayOfTheMonth = new Date( currentDate.toString() );

    firstDayOfTheMonth.setDate( 1 );

    firstDayOfTheMonth.setMonth( selectedMonth );

    let firstDayPosition = firstDayOfTheMonth.getDay();

    monthNameUI.textContent = monthsList[ selectedMonth ];

    yearNumberUI.textContent = selectedYear.toString();

    // Limit for when to end the days display on the calendar
    let dayCount = 0;

    /*
        Determine the number of days in the month as a list that is a parallel 
        array to the month number from the date object
    */
    let daysInMonthList = [ 
        31, 28, 31, 
        30, 31, 30,
        31, 31, 30,
        31, 30, 31
    ]

    // If the year is divisible by 4, it is a leap year and Feb will have 29 days instead of 28
    let febIndex = 1;

    // Access the divisibility of the year selected
    if ( selectedYear % 4 === 0 ) {

        daysInMonthList[ febIndex ] = 29;

    } else {

        daysInMonthList[ febIndex ] = 28;

    }

    let monthMax = daysInMonthList[ selectedMonth ];

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