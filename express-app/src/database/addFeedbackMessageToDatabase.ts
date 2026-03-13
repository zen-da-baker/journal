// Import data models
import { FeedbackMessage } from "../client/models/FeedbackMessage.js";

// Import the MongoDB driver for allowing the database to be accessed by the website controllers
import { MongoClient } from "mongodb";

// Import environment parsing from Node
import { env } from "node:process";

// This function expects an already validated message object to save to the messages collection on the database
export async function addFeedbackMessageToDatabase( message: FeedbackMessage ) {

    try {

        // The client of the MongoDB driver is created
        const client = new MongoClient( env.URI );

        // The database name is used for the connection
        const dbName = env.DB_NAME;

        // The client is connected
        await client.connect();

        // The database is accessed
        const db = client.db( dbName );

        // The message collection is accessed
        const messageCollection = db.collection("feedback-message-collection");

        // The message is added to the database
        await messageCollection.insertOne( message );

    } catch( error ) {

        console.log( error );

    }
 
}