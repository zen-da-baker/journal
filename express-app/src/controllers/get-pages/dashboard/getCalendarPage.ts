import { calendarPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getCalendarPage( request: any, response: any, next: any ) {

    if ( calendarPageContent === "" ) {

        let pageError = new Error("This page was not found");

        return next( pageError );

    }

    return response.send( calendarPageContent );

}