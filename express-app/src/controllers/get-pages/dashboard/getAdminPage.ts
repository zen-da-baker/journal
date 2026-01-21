// Import admin page content
import { adminPageContent } from "../../../helpers/page-contents/pageContents.js";

export async function getAdminPage( request: any, response: any, next: any ) {

    if ( adminPageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );

    }

    return response.send( adminPageContent );

}