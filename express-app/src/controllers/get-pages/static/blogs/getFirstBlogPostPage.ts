// Import page content
import { firstBlogPostPageContent } from "../../../../helpers/page-contents/pageContents.js";

export function getFirstBlogPostPage( request: any, response: any, next: any ) {

    if ( firstBlogPostPageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );

    }

    return response.send( firstBlogPostPageContent );
    
}