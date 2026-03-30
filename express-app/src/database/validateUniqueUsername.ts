// Import external packages
import { MongoClient } from "mongodb";

// Import environment parsing from Node
import { env } from "node:process";

/* 
    This function searches through the user database to confirm if the username is unique. 
    If the username was found and it is not unique, the function returns false. 
    Otherwise, the function returns true meaning the username was not found.
    This allows the username to be used as a the primary key in the database. 
*/
export async function validateUniqueUsername( username: string ): Promise<boolean> {

    try {

        // The client for connection to the database
        const client = new MongoClient( env.URI );

        console.log( "Connecting to MongoDB client." );

        const dbName = env.DB_NAME;

        await client.connect();

        console.log("MongoDB client connected.")

        // The database which has a collection of user objects
        const db = client.db( dbName );

        console.log("Database accessed.");

        const collection = db.collection("users");

        console.log("Users collection accessed.");

        // The user document is searched for based on the username but is null if it wasn't found
        const userDocument = await collection.findOne( { username: username } );

        console.log("User is searched for in the users collection using the username.");

        // If the document for the user was not found, the function will return true meaning the username is unique
        if ( userDocument === null ) {

            client.close();

            console.log("The user was not found and the function returns true.");

            return true;

        } 

        client.close();

        console.log("The user was found and the function returns false after closing the database connection.");

        return false;

    } catch( error: any ) {

        console.log( error );

        console.log("The server threw and error.");

        return false;

    }

}