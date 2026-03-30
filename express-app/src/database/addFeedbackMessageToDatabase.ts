// Import data models
import { FeedbackMessage } from "../client/models/FeedbackMessage.js";

// Import database
import { database } from "../server.js";

// Import environment parsing from Node
import { env } from "node:process";

// This function expects an already validated message object to save to the messages collection on the database
export async function addFeedbackMessageToDatabase( message: FeedbackMessage ) {

    try {

        // The message collection is accessed
        const messageCollection = database.collection("feedback-message-collection");

        // The message is added to the database
        await messageCollection.insertOne( message );

    } catch( error ) {

        console.log( error );

    }
 
}