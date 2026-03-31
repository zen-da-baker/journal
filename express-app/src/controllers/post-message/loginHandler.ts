// Import data models
import { User } from "../server-models/User.js";

// Import helper functions
import { validateUserStrings } from "../../helpers/validateUserStrings.js";
import { findUser } from "../../database/findUser.js";
import { validatePassword } from "../../database/validatePassword.js";
import { createUserToken } from "../../database/createUserToken.js";
import { assignUserToken } from "../../database/assignUserToken.js";
import { removeExpiredTokens } from "../../database/removeExpiredTokens.js";
import { saveUserAccount } from "../../database/saveUserAccount.js";

export async function loginHandler( request: any, response: any, next: any ) {

    const body = request.body;

    if ( body === null || body === undefined ) {

        return response.status( 400 ).json({
            msg: "The request lacked the necessary information to be acted upon. Please submit a username and password."
        })

    }

    let username: string;

    let password: string;

    if ( !body.username || !body.password ) {

        return response.status( 400 ).json({
            msg: "The submission did not include a username or password. Please try submitting again."
        })

    }

    // Username and password sanitized for use
    username = validateUserStrings( body.username );

    password = validateUserStrings( body.password );

    // Now, find the user object for the login process
    let user: User | null = await findUser( username );

    // If the user object does not exist, send back and error that the username was incorrect
    if ( user === null ) {

        return response.status( 400 ).json({
            msg: "The username input does not exist. Please review it again."
        })

    }

    // Check the password now and if the password does not match, send back an error
    let validatedPassword = await validatePassword( password, user.password );

    if ( !validatedPassword ) {

        return response.status( 400 ).json({
            msg: "The password submitted is invalid. Please review."
        })

    }

    // If the password is a match, create a new token
    let token = createUserToken( username );

    // Assign the token to the user account and save it 
    removeExpiredTokens( user );

    user.listOfTokens.push( token );

    saveUserAccount( user );

    // Lastly, send the token to the user so they can make changes to their account
    return response.status( 200 ).json({
        token,
        username,
        msg: "Account login successful."
    })

}