/*
    This function attempts to set the focus to a line element with the given ID 
    and recursively attempts again every 50 miliseconds until successful or 10 attempts are made. 
    This function has no return value.
*/
export function focusOnLine( lineId: string, attemptCount: number ): void {

    // Identify the DOM element with the given ID string
    let lineToFocus = document.getElementById( lineId );

    // If the attempt count is greater than or equal to 10, exit the function to avoid an infinite recursive loop
    if ( attemptCount >= 10 ) {

        return;

    }

    // If the element is null or undefined and the attempt count is less than 10, try again
    if ( lineToFocus === null || lineToFocus === undefined ) {

        // Increase the attempt count and try again after 50 milliseconds
        attemptCount++;

        setTimeout( () => focusOnLine( lineId, attemptCount ), 50);

    }

    // If the element is known, set the focus to it
    lineToFocus.focus();

}