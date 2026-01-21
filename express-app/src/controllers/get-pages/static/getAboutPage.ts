// Import page content
import { aboutPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getAboutPage( request: any, response: any, next: any ) {

    if ( aboutPageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );
        
    }

    return response.send( aboutPageContent );

}