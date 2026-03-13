// Import helper functions
import { validateUserStrings } from "../../helpers/validateUserStrings.js";

// Import the database helper function
import { addFeedbackMessageToDatabase } from "../../database/addFeedbackMessageToDatabase.js"

// Import datamodels
import { FeedbackMessage } from "../../client/models/FeedbackMessage.js";

/*
    This controller function is called during a POST request to the /dashboard/messages route. 
    The request should have a JSON body, if it doesn't, no action is taken. 
    If the request does have a JSON body, it will be inserted into the database of messeges.
*/
export async function storeFeedbackMessage( request: any, response: any, next: any ) {

    // First, the body of the request is checked for if it is empty and if so, no further action is taken
    if ( request.body === null ) {

        return response.status( 400 ).json({

            msg: "The request does not contain a message."

        })

    }

    // The raw message object is extracted from the request body
    let unvalidatedMessage = request.body;

    // Each field of the message body will be validated 
    let validatedName: string;

    if ( unvalidatedMessage.name ) {

        validatedName = validateUserStrings( unvalidatedMessage.name );

    }

    let validatedEmail: string;

    if ( unvalidatedMessage.email ) {

        validatedEmail = validateUserStrings( unvalidatedMessage.email );

    }

    let validatedSubject: string;

    if ( unvalidatedMessage.subject ) {

        validatedSubject = validateUserStrings( unvalidatedMessage.subject );

    }

    let validatedBody: string;

    if ( unvalidatedMessage.body ) {

        validatedBody = validateUserStrings( unvalidatedMessage.body );

    }

    let validatedSubmittedFrom: string;

    if ( unvalidatedMessage.submittedFrom ) {

        validatedSubmittedFrom = validateUserStrings( unvalidatedMessage.submittedFrom )
        
    }

    // All validated strings are collected together to form the message object
    let message = new FeedbackMessage( 
        validatedName, 
        validatedEmail, 
        validatedSubject, 
        validatedBody, 
        validatedSubmittedFrom 
    );

    console.log( "A message was stored successfully." );

    // The message object is now stored in the database after all strings were sanitized
    addFeedbackMessageToDatabase( message );
    
    // The user receives a message back that the feedback was stored successfully 
    return response.status( 200 ).json({ msg: "Message stored successfully" });

}