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

        const dbName = env.DB_NAME;

        await client.connect();

        // The database which has a collection of user objects
        const db = client.db( dbName );

        const collection = db.collection("users");

        // The user document is searched for based on the username but is null if it wasn't found
        const userDocument = await collection.findOne( { username: username } );

        // If the document for the user was not found, the function will return true meaning the username is unique
        if ( userDocument === null ) {

            client.close();

            return true;

        } 

        client.close();

        return false;

    } catch( error: any ) {

        console.log( error );

        return false;

    }

}