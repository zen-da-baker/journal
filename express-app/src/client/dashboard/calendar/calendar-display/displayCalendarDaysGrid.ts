export function displayCalendarDaysGrid(): void {

    let calendarDaysGridUI = document.getElementById("calendar-days-grid");

    let currentDate = new Date();

    let dayIterations = 0;

    let totalIterations: number = 1;

    for ( let outerIterator = 0; outerIterator < totalIterations; outerIterator++ ) {

        let calendarDaysRowUI = document.createElement("div");

        calendarDaysRowUI.id = "row-" + outerIterator;

        calendarDaysRowUI.className = "flex calendar-row";

        for ( let innerIterator = 0; innerIterator < 7; innerIterator++ ) {

            let calendarDayUI = document.createElement("div");

            calendarDayUI.className = "calendar-day calendar-column";

            if ( innerIterator === 0 || innerIterator === 6 ) {

                calendarDayUI.className += " calendar-weekend";

            } 

            if ( dayIterations + 1 === currentDate.getDate() ) {

                calendarDayUI.className += " current-day";

            }

            calendarDayUI.id = "day-row-" + outerIterator + "-column-" + innerIterator;

            calendarDaysRowUI.appendChild( calendarDayUI );

            dayIterations++;

        }

        if ( totalIterations < 6 ) {

            totalIterations++;

        }

        calendarDaysGridUI.appendChild( calendarDaysRowUI );

    }

}