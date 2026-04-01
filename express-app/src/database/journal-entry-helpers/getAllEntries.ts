// Import data models
import { User } from "../../controllers/server-models/User.js";
import { Token } from "../../client/models/Token.js";
import { EntryModel } from "../../client/models/EntryModel.js";

// Import database from MongoDB
import { database } from "../../server.js";

// Import helper functions
import { validateUserStrings } from "../../helpers/validateUserStrings.js";
import { validateUniqueUsername } from "../validateUniqueUsername.js";
import { findUser } from "../findUser.js";
import { verifyUserToken } from "../verifyUserToken.js";

export async function getAllEntries( request: any, response: any ) {

    if ( request.query === null ) {
    
        return response.status( 400 ).json({
            msg: "The needed details are missing in this request."
        })
        
    }

    // First the query object is extracted
    const queryObject = request.query;

    const tokenString = queryObject.token;

    if ( tokenString === null || tokenString === undefined ) {

        return response.status( 400 ).json({
            msg: "The needed details in this request are missing."
        })

    }

    // The token is parsed
    const token: Token = JSON.parse( tokenString );

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

    // Now that the user is verified, get the requested entries
    const collection = database.collection( token.username );

    const entriesList: Array<EntryModel> | null = collection.find();

    if ( entriesList === null ) {

        return response.status( 400 ).json({
            msg: "The journal entries were not found."
        })

    }

    response.status( 200 ).json({
        msg: "The journal entry was found successfully.",
        journalEntries: entriesList
    })
    
}