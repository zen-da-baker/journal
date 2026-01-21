// Import the base page content for errors
import { serverErrorPageContent } from "../../helpers/page-contents/pageContents.js";

export function getErrorPage( error: Error, request: any, response: any, next: any ) {

    console.error( error.stack );

    return response.status( 500 ).send( serverErrorPageContent );
    
}