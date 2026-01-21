// Import the page contents from the global scope
import { landingPageContent } from "../../helpers/page-contents/pageContents.js";

export async function getHomePage( request: any, response: any, next: any ) {

    if ( landingPageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );
        
    }

    // Send the page contents string to the requesting user
    return response.send( landingPageContent );    

}