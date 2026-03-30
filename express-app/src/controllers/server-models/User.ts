// Import data models
import { Token } from "../../client/models/Token.js";

/*
    This User data model stores the username, hashed password, and list of tokens. 
    The fields are all expected to have been sanitized by the route controller function
    by the time this object is created. Each object is intended to be stored in a NoSQL
    database meaning that the objects themselves cannot have methods. All modification 
    functions that would have been methods are instead helper functions.

    A special note on tokens: expired tokens are removed when a new token is added.
*/
export class User {

    // The username
    username: string;

    // The hashed password for login attempts
    password: string;

    // The list of tokens 
    listOfTokens: Array<Token>;

    // The constructor of the user object only expects the username and hashed password
    constructor( inputUsername: string = "", inputPassword: string = "" ) {

        this.username = inputUsername;

        this.password = inputPassword;

        // Tokens are always initialized as an empty list
        this.listOfTokens = [];

    }

}