// Import helper functions
import { validateUserStrings } from "../../helpers/validateUserStrings.js";
import { validateUniqueUsername } from "../../database/validateUniqueUsername.js";

export async function signupHandler( request: any, response: any, next: any ) {

    const body = request.body;

    // First the route checks if the form submitted has all of the parts required, or else it throws a server error
    if ( body === null || body === undefined ) {

        return response.status( 400 ).json({
            msg: "The submission was invalid."
        })

    }

    let username: string;

    let password1: string;

    let password2: string;

    try {

        if ( body.username ) {

            username = body.username;

            if ( username === "" ) {
                
                throw new Error("Username missing.");

            }

        }

        if ( body.password1 ) {

            password1 = body.password1;

            if ( password1 === "" ) {
                
                throw new Error("Password missing.");
                
            }

        }

        if ( body.password2 ) {

            password2 = body.password2;

            if ( password2 === "" ) {
                
                throw new Error("Password missing.");
                
            }

        }

    } catch( error: any ) {

        console.log( error );

        return response.status( 400 ).json({
            msg: "A field is missing from the submission. Please try again."
        })

    }

    // Next the route sanitizes the string fields of the expected submission object
    username = validateUserStrings( username );

    password1 = validateUserStrings( password1 );

    password2 = validateUserStrings( password2 );

    if ( password1 !== password2 ) {

        return response.status( 400 ).json({
            msg: "The password and confirmation entry do not match."
        })

    }

    /* 
        Next the username is checked to see if it is unique so it can be used as the primary key of the user database.
        The user database is expected to be a collection of objects that hold the username, the hashed password, and the 
        list of active tokens. When a token expires, it will be removed from the queue of tokens. 
    */
    let uniqueUsername = await validateUniqueUsername( username );

    if ( !uniqueUsername ) {

        return response.status( 400 ).json({
            msg: "The username submitted is already in user. Try logging in instead or try a different username."
        })

    }

    // Hash the password and store it and return the confirmation of it's success or failure
    let hashedPassword = hashPassword( password1 );

    // Assigne a new token to the user account 
    let userToken = assignUserToken( username );

    // Return back the successful status of the account creation along with the active token

    return response.status( 200 ).json({
        msg: "Form submitted."
    })

}