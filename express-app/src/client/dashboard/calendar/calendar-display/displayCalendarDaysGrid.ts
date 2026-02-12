import { monthsList } from "../../monthsList.js";

export function displayCalendarDaysGrid( selectedMonth: number , selectedYear: number ): void {

    // The calendar grid HTML element will be gathered first
    let calendarDaysGridUI = document.getElementById("calendar-days-grid");

    // If the grid already has a display when this function is called, it will be cleared
    if ( calendarDaysGridUI.innerHTML !== "" ){
    
        calendarDaysGridUI.innerHTML = "";

    }

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

    let currentDate = new Date();

    let firstDayNumber = 1;

    let firstDayOfTheMonth = new Date( selectedYear, selectedMonth, firstDayNumber );

    let firstDayPosition = firstDayOfTheMonth.getDay();

    let dayIterations = 0;

    let previousMonthDaysInFirstRow = 0;

    let totalCalendarRows: number = 1;

    let maxDaysInTheMonth = daysInMonthList[ selectedMonth ];

    let monthNameUI = document.getElementById("month-name");

    let yearNumberUI = document.getElementById("year-number");

    monthNameUI.textContent = monthsList[ selectedMonth ];
    
    yearNumberUI.textContent = selectedYear.toString();


    // The number of rows the calendar will have
    for ( let outerIterator = 0; outerIterator < totalCalendarRows; outerIterator++ ) {

        // The row element is created so days can be added based on certain conditions 
        let calendarDaysRowUI = document.createElement("div");

        calendarDaysRowUI.id = "row-" + outerIterator;

        calendarDaysRowUI.className = "flex calendar-row";

        // The number of columns a row has which is always fixed to 7 days
        for ( let innerIterator = 0; innerIterator < 7; innerIterator++ ) {

            // The day element is created
            let calendarDayUI = document.createElement("div");

            // The CSS class of the day is started
            calendarDayUI.className = "calendar-day calendar-column";

            // If it is the first or last day in the row, the class name adds and assigns the calendar weekend CSS class
            if ( innerIterator === 0 || innerIterator === 6 ) {

                calendarDayUI.className += " calendar-weekend";

            } 

            // If the current day in the calendar is of the same date, month, and year, highlight it
            if ( 
                dayIterations + 1 === currentDate.getDate() 
                && 
                currentDate.getFullYear() === selectedYear 
                &&
                currentDate.getMonth() === selectedMonth
            ) {

                calendarDayUI.className += " current-day";

            }

            calendarDayUI.id = "day-row-" + outerIterator + "-column-" + innerIterator;

            let calendarDateText = document.createElement("span");

            /* 
                If the day iterations is greater than zero, increase the iterations and display the date 
                number on the calendar first since the following block for the first day only will not run.
            */
            if ( dayIterations > 0 && dayIterations < maxDaysInTheMonth ) {

                dayIterations++;

                calendarDateText.textContent = dayIterations.toString();

                calendarDayUI.appendChild( calendarDateText );

            }

            // If the first day is equal to the current display position for the first week row, start the day count
            if ( firstDayPosition === innerIterator && outerIterator === 0 ) {

                dayIterations++;

                /* 
                    The inner iteration count plus the day that was zeroed will be used to know how many
                    days from the previous month were in the first row. This assists in controlling how many
                    total rows are displayed by not counting them toward the maximum days in the month.
                */
                previousMonthDaysInFirstRow = innerIterator + 1;

                calendarDateText.textContent = ( dayIterations ).toString();

                calendarDayUI.appendChild( calendarDateText );
        
            }

            calendarDaysRowUI.appendChild( calendarDayUI );

        }

        calendarDaysGridUI.appendChild( calendarDaysRowUI );

        /* 
            The total number of rows is determined by the number of days remaining after the first row is established.
            As each row is created, a new row is added if there are more days to be added to the calendar.
        */
        if ( dayIterations < maxDaysInTheMonth ) {

            // Add a new row to the count while there are still days to cycle through
            totalCalendarRows += 1;

        }

    }

}