// Import page content
import { loginPageContent } from "../../../helpers/page-contents/pageContents.js";

export async function getLoginPage( request: any, response: any, next: any ) {

    if ( loginPageContent === "" ) {

        let pageError = new Error("This page was not found");

        return next( pageError );

    }

    return response.send( loginPageContent );

}