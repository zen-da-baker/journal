import { dreamEntryPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getDreamEntryPage( request: any, response: any, next: any ) {

    if ( dreamEntryPageContent === "" ) {

        let pageError = new Error("This page does not exist");

        return next( pageError );

    }

    return response.send( dreamEntryPageContent );

}