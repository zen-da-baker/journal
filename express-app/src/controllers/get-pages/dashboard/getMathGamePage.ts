// Import math game page content
import { mathGamePageContent } from "../../../helpers/page-contents/pageContents.js";

export function getMathGamePage( request: any, response: any, next: any ) {

    if ( mathGamePageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );

    }

    return response.send( mathGamePageContent );

}