import { lessonsHomePageContent } from "../../../helpers/page-contents/pageContents.js";

export function getLessonsHomePage( request: any, response: any, next: any ) {

    if ( lessonsHomePageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );

    }

    return response.send( lessonsHomePageContent );
    
}