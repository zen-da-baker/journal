// Import data models 
import { Token } from "../client/models/Token.js";
import { User } from "../controllers/server-models/User.js";

// Import helper functions
import { saveUserAccount } from "./saveUserAccount.js";

/*
    This function stores the argument validated account information fields as a single user object that will be stored in the database.
    The function returns a boolean for if the operation was successful or not.
*/
export async function storeNewUserAccount( username: string, hashedPassword: string, token: Token ): Promise<User | null> {

    let user = new User( username, hashedPassword );

    console.log("A new user object has been created.")

    user.listOfTokens.push( token );

    console.log("Attempting to save the user token in the database.");

    let success = await saveUserAccount( user );

    // If the user account was not stored successfully, an error is thrown instead 
    if ( !success ) {

        return null;

    }

    return user;

}