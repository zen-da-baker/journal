import { journalEntryPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getJournalEntryPage( request: any, response: any, next: any ) {

    if ( journalEntryPageContent === "" ) {

        let pageError = new Error("This page was not found");

        return next( pageError );

    }

    return response.send( journalEntryPageContent );

}