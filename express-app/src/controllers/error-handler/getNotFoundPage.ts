// Import the page content for displaying when a page is not found
import { notFoundPageContent } from "../../helpers/page-contents/pageContents.js";

export function getNotFoundPage( request: any, response: any ) {

    return response.status( 404 ).send( notFoundPageContent );

}