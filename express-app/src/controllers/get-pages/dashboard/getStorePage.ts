// Import store page content
import { storePageContent } from "../../../helpers/page-contents/pageContents.js";

export function getStorePage( request: any, response: any, next: any ) {

    if ( storePageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );

    }

    return response.send( storePageContent );

}