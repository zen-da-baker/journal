// Import database
import { database } from "../server.js";

// Import data models 
import { User } from "../controllers/server-models/User.js";

// Import environment parsing from Node
import { env } from "node:process";

/*
    This function takes in a user object and performs a search of the database to 
    see if it exists and to update it if it does exist or to insert it if it doesn't
    already exist. 
    The most important database identifiers are imported from an environment variable 
    for security.
*/
export async function saveUserAccount( user: User ): Promise<boolean> {

    try {

        /*
            The collection for saving account details is the users collection with each user object being a file.
            This allows for searching the database by the username for account modifications as shown below.
        */
        let collection = database.collection("users");

        console.log("The users collection is being accessed.");

        // The user object is searched for and then updated, or inserted if it doesn't already exist
        collection.updateOne( { username: user.username }, { $set: user }, { upsert: true} );

        console.log("The collection had a document for the user modified.");

    } catch( error: any ) {

        console.log( error );

        // The operation was not successful so the function returns false
        return false;

    } finally {

        console.log("The client is closed and the function returns true for a successful operation.");

    }

    // Lastly, the function returns true for a successful operation if no error occured
    return true;

}