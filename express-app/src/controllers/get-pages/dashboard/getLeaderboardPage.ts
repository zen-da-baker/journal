// Import leaderboard page content
import { leaderboardPageContent } from "../../../helpers/page-contents/pageContents.js";

export function getLeaderboardPage( request: any, response: any, next: any ) {

    if ( leaderboardPageContent === "" ) {

        let pageError = new Error("Page not found");

        return next( pageError );

    }

    return response.send( leaderboardPageContent );
    
}