// Import page content
import { dashboardHomePageContent } from "../../../helpers/page-contents/pageContents.js";

export function getDashboardHomePage( request: any, response: any, next: any  ) {

    if ( dashboardHomePageContent === "" ) {

        let pageError = new Error( "Page not found" );

        return next( pageError );

    }

    return response.send( dashboardHomePageContent );

}