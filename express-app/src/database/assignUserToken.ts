// Import data models
import { Token } from "../client/models/Token.js";
import { User } from "../controllers/server-models/User.js";

// Import helper functions
import { createUserToken } from "./createUserToken.js";
import { removeExpiredTokens } from "./removeExpiredTokens.js";
import { saveUserAccount } from "./saveUserAccount.js";

/*
    This function takes in a username string that was already sanitized and creates a token
    for that user account and returns the token. If the token ID exists already, the function
    will try up to 100 times to create a new token with a unique ID.

    This functions expects to be used on a user account that was already created, not for
    a brand new account.
*/
export function assignUserToken( user: User ): boolean {

    let attempts = 0;
    
    let newToken = createUserToken( user.username );

    let existingTokenList = user.listOfTokens;

    while ( attempts < 100 ) {

        let existingTokenId = existingTokenList.findIndex( ( searchToken: Token ) => {

            if ( searchToken.id === newToken.id ) {

                return true;

            }

            return false;

        })

        if ( existingTokenId === -1 ) {

            break;

        }

        newToken = createUserToken( user.username );

        attempts++;

    }

    if ( attempts === 99 ) {

        return false;

    }

    // Remove expired tokens before the new one is inserted of which the expired tokens would likely be at the front
    removeExpiredTokens( user );

    user.listOfTokens.push( newToken );

    saveUserAccount( user );

}