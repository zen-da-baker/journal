// Import page content
import { signupPageContent } from "../../../helpers/page-contents/pageContents.js";

export async function getSignUpPage( request: any, response: any, next: any ) {

    if ( signupPageContent === "" ) {

        let pageError = new Error("This page was not found");

        return next( pageError );

    }

    return response.send( signupPageContent );

}