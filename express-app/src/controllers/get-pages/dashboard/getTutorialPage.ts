import { tutorialPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getTutorialPage( request: any, response: any, next: any ) {

    if ( tutorialPageContent === "" ) {

        let pageError = new Error("This page does not exist.");

        return next( pageError );

    }

    return response.send( tutorialPageContent );
    
}