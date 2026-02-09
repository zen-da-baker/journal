export function displayCalendarDaysGrid(): void {

    let calendarDaysGridUI = document.getElementById("calendar-days-grid");

    for ( let outerIterator = 0; outerIterator < 4; outerIterator++ ) {

        let calendarDaysRowUI = document.createElement("div");

        calendarDaysRowUI.id = "row-" + outerIterator;

        calendarDaysRowUI.className = "flex calendar-row"

        for ( let innerIterator = 0; innerIterator < 7; innerIterator++ ) {

            let calendarDayUI = document.createElement("div");

            if ( innerIterator === 0 || innerIterator === 6 ) {

                calendarDayUI.className = "calendar-day calendar-weekend";

            } else {

                calendarDayUI.className = "calendar-day";

            }

            calendarDayUI.id = "day-row-" + outerIterator + "-column-" + innerIterator;

            calendarDaysRowUI.appendChild( calendarDayUI );

        }

        calendarDaysGridUI.appendChild( calendarDaysRowUI );

    }

}