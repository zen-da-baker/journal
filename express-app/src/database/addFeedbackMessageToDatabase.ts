// Import the MongoDB driver for allowing the database to be accessed by the website controllers
import { MongoClient } from "mongodb";

// Import environment parsing from Node
import { env } from "node:process";

// This function expects an already validated message object to save to the messages collection on the database
export async function addFeedbackMessageToDatabase( message: any ) {

    try {

        const client = new MongoClient( env.URI );

        const dbName = env.DB_NAME;

        await client.connect();

        const db = client.db( dbName );

        const messageCollection = db.collection("feedback-message-collection");

        await messageCollection.insertOne( message );

    } catch( error ) {

        console.log( error );

    }
 
}