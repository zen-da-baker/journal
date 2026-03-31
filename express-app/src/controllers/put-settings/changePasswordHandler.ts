// Import data models
import { User } from "../server-models/User.js";
import { Token } from "../../client/models/Token.js";

// Import helper functions
import { findUser } from "../../database/findUser.js";
import { verifyUserToken } from "../../database/verifyUserToken.js";
import { validateUserStrings } from "../../helpers/validateUserStrings.js";
import { validatePassword } from "../../database/validatePassword.js";
import { hashPassword } from "../../database/hashPassword.js";
import { saveUserAccount } from "../../database/saveUserAccount.js";

export async function changePasswordHandler( request: any, response: any, next: any ) {

    const body = request.body;

    // First, verify that the body exists
    if ( body === null || body === undefined ) {

        return response.status( 400 ).json({
            msg: "The request is missing details needed for action to be taken."
        })

    }

    // Next, verify that all parts of the body exist
    if ( !body.originalPassword || !body.newPassword1 || !body.newPassword2 || !body.username || !body.token ) {

        return response.status( 400 ).json({
            msg: "Details of the request are missing meaning that the intended action could not be taken."
        })

    }

    // Sanitize all strings submitted to the server
    body.originalPassword = validateUserStrings( body.originalPassword );

    body.newPassword1 = validateUserStrings( body.newPassword1 );

    body.newPassword2 = validateUserStrings( body.newPassword2 );

    body.username = validateUserStrings( body.username );

    body.token.username = validateUserStrings( body.token.username );

    body.token.id = validateUserStrings( body.token.id );

    body.token.expirationDate = validateUserStrings( body.token.expirationDate );

    // Then, make sure that the passwords match
    if ( body.newPassword1! !== body.newPassword2 ) {

        return response.status( 400 ).json({
            msg: "The password entries do not match. Please review your selection again."
        })

    }

    // Access the user object for comparing the password
    const user: User | null = await findUser( body.username );

    if ( user === null ) {

        return response.status( 400 ).json({
            msg: "The username submitted was invalid. Please review your choice again."
        })

    }

    // Make sure that current password is a valid password
    let validatedPasswordStatus = await validatePassword( body.originalPassword, user.password );

    if ( !validatedPasswordStatus ) {

        return response.status( 400 ).json({
            msg: "The current password used did not match. Please review it and try submitting again."
        })

    }

    // Make sure that the token is a valid token
    let verifiedTokenStatus = verifyUserToken( user, body.token );

    if ( !verifiedTokenStatus ) {

        return response.status( 400 ).json({
            msg: "The request was not made from a logged in account. Please login instead and then submit the request again."
        })

    }

    // All authorization is done which means next is to hash the new password
    let newHashedPassword = await hashPassword( body.newPassword1 );

    // Replace the original password with the new password hash
    user.password = newHashedPassword;

    saveUserAccount( user );

    // Send the final response back to the client side
    return response.status( 200 ).json({
        msg: "The password was changed successfully. Make sure to record it in a safe place."
    })

}