// Import data models 
import { Token } from "../client/models/Token.js";
import { User } from "../controllers/server-models/User.js";

// Import environment parsing from Node
import { env } from "node:process";

/*
    This function stores the argument validated account information fields as a single user object that will be stored in the database.
    The function returns a boolean for if the operation was successful or not.
*/
export function storeNewUserAccount( username: string, hashedPassword: string, token: Token ): User {

    let user = new User( username, hashedPassword );

    user.listOfTokens.push( token );

    return user;

}