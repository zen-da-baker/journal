// Import data models
import { Token } from "../client/models/Token.js";

/*
    This function simply generates a token for storage in the user's account.
*/
export function createUserToken( username: string ): Token {

    const token = new Token( username );

    return token;

}