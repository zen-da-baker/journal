export function displayCalendarDaysGrid(): void {

    let calendarDaysGridUI = document.getElementById("calendar-days-grid");

    let currentDate = new Date();

    let firstDayOfTheMonth = new Date( currentDate );

    firstDayOfTheMonth.setDate( 1 );

    let firstDayPosition = firstDayOfTheMonth.getDay();

    let dayIterations = 0;

    let totalCalendarRows: number = 1;

    let maxDaysInTheMonth = 31;

    // The number of rows the calendar will have
    for ( let outerIterator = 0; outerIterator < totalCalendarRows; outerIterator++ ) {

        let calendarDaysRowUI = document.createElement("div");

        calendarDaysRowUI.id = "row-" + outerIterator;

        calendarDaysRowUI.className = "flex calendar-row";

        // The number of columns a row has which is always fixed to 7 days
        for ( let innerIterator = 0; innerIterator < 7; innerIterator++ ) {

            let calendarDayUI = document.createElement("div");

            calendarDayUI.className = "calendar-day calendar-column";

            if ( innerIterator === 0 || innerIterator === 6 ) {

                calendarDayUI.className += " calendar-weekend";

            } 

            // If the current day in the calendar is of the same date, month, and year, highlight it
            if ( 
                dayIterations + 1 === currentDate.getDate() 
                && 
                currentDate.getFullYear() === firstDayOfTheMonth.getFullYear()  
                &&
                currentDate.getMonth() === firstDayOfTheMonth.getMonth()
            ) {

                calendarDayUI.className += " current-day";

            }

            calendarDayUI.id = "day-row-" + outerIterator + "-column-" + innerIterator;

            calendarDaysRowUI.appendChild( calendarDayUI );

            // If the first day is equal to the current display position for the first week row, start the day count
            if ( firstDayPosition === innerIterator && outerIterator === 1 ) {

                dayIterations++;
        
            }

            if ( dayIterations > 0 && dayIterations <= maxDaysInTheMonth ) {

                dayIterations++;

            }

        }

        // The total number of rows is determined by the number of days after the first row is established
        if ( dayIterations < maxDaysInTheMonth ) {

            // Add a new row to the count while there are still days to cycle through
            totalCalendarRows += 1;

        }

        console.log( totalCalendarRows );

        console.log( dayIterations );

        calendarDaysGridUI.appendChild( calendarDaysRowUI );

    }

}