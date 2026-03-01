import validator from "validator";

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

    let validatedName: string;

    if ( unvalidatedMessage.name ) {

        validator.blacklist( unvalidatedMessage.name, "{", "}", "[", "]", "$" );

        validator.escape( unvalidatedMessage.name );

        validator.trim( unvalidatedMessage.name );

        validatedName = unvalidatedMessage.name;

    }

    let validatedEmail: string;

    if ( unvalidatedMessage.email ) {

        validator.isEmail( unvalidatedMessage.email );

        validator.normalizeEmail()

    }

    let validatedSubject: string;

    let validatedBody: string;

    let message = new FeedbackMessage();

    console.log( message.msg );
    
    return response.status( 200 ).json(
        
    )

}