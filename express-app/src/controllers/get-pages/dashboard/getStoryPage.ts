// Import story page content
import { storyPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getStoryPage( request: any, response: any, next: any ) {

    if ( storyPageContent === "" ) {

        let pageError = new Error("Page not found");

        next( pageError );

    }

    return response.send( storyPageContent );

}