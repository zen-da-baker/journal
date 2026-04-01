// Import data models
import { User } from "../../controllers/server-models/User.js";
import { Token } from "../../client/models/Token.js";

// Import database
import { database } from "../../server.js";

// Import helper functions
import { validateUserStrings } from "../../helpers/validateUserStrings.js";
import { validateUniqueUsername } from "../validateUniqueUsername.js";
import { findUser } from "../findUser.js";
import { verifyUserToken } from "../verifyUserToken.js";

export async function deleteOneEntry( request: any, response: any ) {

    const body = request.body;
        
    if ( body === null || body === undefined ) {

        return response.status( 400 ).json({
            msg: "The body of the request was empty."
        })

    }

    if ( !body.entryId || !body.token ) {

        return response.status( 400 ).json({
            msg: "Needed details are missing from this request."
        })

    }

    // The token is parsed
    const token: Token = JSON.parse( body.token );

    // The token string is parsed or else an error is thrown if the fields do not exist
    token.username = validateUserStrings( token.username );
    token.id = validateUserStrings( token.id );
    token.expirationDate = validateUserStrings( token.expirationDate );

    // Validate the user token
    let nonExistantUser = await validateUniqueUsername( token.username );

    if ( nonExistantUser ) {

        return response.status( 400 ).json({
            msg: "This user does not exist."
        })

    }

    let user: User = await findUser( token.username );

    let verifiedUser = verifyUserToken( user, token );

    if ( !verifiedUser ) {

        return response.status( 400 ).json({
            msg: "The user could not be verified."
        })

    }

    let entryId = body.entryId;

    // The journal entry id being used for a query could be the source of an injection attack and must be sanitized
    entryId = validateUserStrings( entryId );

    let username = token.username;

    const userCollection = database.collection( username );

    userCollection.deleteOne( { id: entryId } );
    
    return response.status( 200 ).json({
        msg: "Journal entry was deleted successfully."
    })

}