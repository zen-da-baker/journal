// Import data models
import { Token } from "../../client/models/Token.js";
import { User } from "../../controllers/server-models/User.js";

// Import helper functions
import { validateUserStrings } from "../../helpers/validateUserStrings.js";
import { validateUniqueUsername } from "../validateUniqueUsername.js";
import { findUser } from "../findUser.js";
import { verifyUserToken } from "../verifyUserToken.js";

// Import database
import { database } from "../../server.js";

export async function updateOneEntry( request: any, response: any ) {

    const body = request.body;
    
    if ( body === null || body === undefined ) {

        return response.status( 400 ).json({
            msg: "The body of the request was empty."
        })

    }

    if ( !body.entry || !body.token ) {

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

    let entry = body.entry;

    // The journal entry id being used for a query could be the source of an injection attack and must be sanitized
    entry.id = validateUserStrings( entry.id );

    let username = token.username;

    const userCollection = await database.collection( username );

    userCollection.updateOne( { id: entry.id }, entry );
    
    return response.status( 200 ).json({
        msg: "Journal entry was updated successfully."
    })
    
}