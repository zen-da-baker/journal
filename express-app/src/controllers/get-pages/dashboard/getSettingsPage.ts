// Import settings page content
import { settingsPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getSettingsPage( request: any, response: any, next: any ) {

    if ( settingsPageContent === "" ) {

        let pageError = new Error("Page not found");

        console.log( pageError );

        return next( pageError );

    }

    return response.send( settingsPageContent );

}