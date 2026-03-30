// Import data models
import { User } from "../controllers/server-models/User.js";
import { Token } from "../client/models/Token.js";

/*
    This function searches through a user's list of tokens
    and removed any expired tokens using a loop.
*/
export function removeExpiredTokens( user: User ): void {

    let expiredTokensExist = true;

    let currentDate = new Date();

    while ( expiredTokensExist ) {

        let expiredTokenIndex = user.listOfTokens.findIndex( ( searchToken: Token ) => {

            let searchTokenDate = new Date( searchToken.expirationDate );

            if ( searchTokenDate < currentDate ) {

                return true;

            }

            return false;

        })

        if ( expiredTokenIndex === -1 ) {

            expiredTokensExist = false;

        }

        let deleteCount = 1;

        user.listOfTokens.splice( expiredTokenIndex, deleteCount );

    }


}