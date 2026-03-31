// Import data models
import { User } from "../controllers/server-models/User.js";
import { Token } from "../client/models/Token.js";

// Import helper functions
import { removeExpiredTokens } from "./removeExpiredTokens.js";

/*
    This helper function expects the user object to already be read from the database and 
    to take in the argument function which verifies that the token is in the active list of tokens.
    The function returns a boolean where true means verified and false means the token is invalid
    which could mean that it is either expired or is not in the list.
*/
export function verifyUserToken( user: User, token: Token ): boolean {

    // First, expired tokens are removed so they are not part of the comparison
    removeExpiredTokens( user );

    let tokenIndex = user.listOfTokens.findIndex( ( searchToken: Token ) => {

        if ( searchToken.id === token.id ) {

            return true;

        }

        return false;

    })

    if ( tokenIndex === -1 ) {

        return false; 

    }

    return true;

}