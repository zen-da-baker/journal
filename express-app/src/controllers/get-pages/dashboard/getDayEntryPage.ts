import { dayEntryPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getDayEntryPage( request: any, response: any, next: any ) {

    if ( dayEntryPageContent === "" ) {

        let pageError = new Error("This page was not found");

        return next( pageError );

    }

    return response.send( dayEntryPageContent );

}