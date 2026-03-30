// Import packages
import { MongoClient } from "mongodb";

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

        // The client object is created
        let client = new MongoClient( env.URI );

        // The client object connects to the database
        await client.connect();

        // The database name is extracted from the environment variable
        let dbName = env.DB_NAME;

        // The database object is found from the database name on the connected client
        let db = client.db( dbName );

        /*
            The collection for saving account details is the users collection with each user object being a file.
            This allows for searching the database by the username for account modifications as shown below.
        */
        let collection = db.collection("users");

        // The user object is searched for and then updated, or inserted if it doesn't already exist
        collection.updateOne( { username: user.username }, { $set: user }, { upsert: true} );

        // Almost last, the client connection to the database is closed
        await client.close();

        // Lastly, true is returned meaning that the storage was performed successfully
        return true;

    } catch( error: any ) {

        console.log( error );

        // The operation was not successful so the function returns false
        return false;

    }

}