// Import data models
import { FeedbackMessage } from "../models/FeedbackMessage.js";

// Settings button elements
const feedbackSubmitButtonUI = document.getElementById("feedback-form-submission-button");

const feedbackCancelButtonUI = document.getElementById("feedback-form-cancel-button");

// Settings form elements
const formNameUI: HTMLInputElement = document.getElementById("feedback-form-name") as HTMLInputElement;

const formEmailUI: HTMLInputElement = document.getElementById("feedback-form-email") as HTMLInputElement;

const formSubjectUI: HTMLInputElement = document.getElementById("feedback-form-subject") as HTMLInputElement;

const formBodyUI: HTMLInputElement = document.getElementById("feedback-form-message-body") as HTMLInputElement;

// The modal elements for display
const fieldsIncompleteModalUI: HTMLDialogElement = document.getElementById("fields-incomplete-modal") as HTMLDialogElement;

const closeIncompleteModalButtonUI = document.getElementById("close-fields-incomplete-modal-button");

const serverErrorModalUI: HTMLDialogElement = document.getElementById("server-error-modal") as HTMLDialogElement;

const closeServerErrorModalButtonUI = document.getElementById("close-server-error-modal-button");

// Import helper functions
import { showSuccessModal } from "../dashboard/modals/showSuccessModal.js";

// Shared style variables
let redBorder: string = "0.1rem solid red";

let blackBorder: string = "0.1rem solid black";

/*
    This helper function clears the values of the input elements.
*/
function clearFeedbackMessageForm(): void {

    formNameUI.value = "";

    formEmailUI.value = "";

    formSubjectUI.value = "";

    formBodyUI.value = "";

    formNameUI.style.border = blackBorder;

    formEmailUI.style.border = blackBorder;

    formSubjectUI.style.border = blackBorder;

    formBodyUI.style.border = blackBorder;

}

/*
    This helper function submits the feedback message to the web server and displays if the 
    request was successful or not.
*/
async function submitFeedbackMessage(): Promise<void> {

    // The input fields of the form elements are assigned to string variables 
    let inputName = formNameUI.value;

    let inputEmail = formEmailUI.value;

    let inputSubject = formSubjectUI.value;

    let inputBody = formBodyUI.value;

    // If any of the input fields are empty, the request will not be made to the web server
    if ( inputName === "" || inputEmail === "" || inputSubject === "" || inputBody === "" ) {

        if ( inputName === "" ) {

            formNameUI.style.border = redBorder;

        }

        if ( inputEmail === "" ) {

            formEmailUI.style.border = redBorder;

        }

        if ( inputSubject === "" ) {

            formSubjectUI.style.border = redBorder;

        }

        if ( inputBody === "" ) {

            formBodyUI.style.border = redBorder;

        }

        // The error modal is shown for missing inputs
        fieldsIncompleteModalUI.show();

        return;

    }

    // The feedback message object is created
    let feedbackMessage = new FeedbackMessage( inputName, inputEmail, inputSubject, inputBody, "Bytesized Journal" );

    // The fetch request options object is created
    let requestMessageObject = {

        // It is a POST request
        method: "POST",

        // The body of the message is expected to be JSON
        headers: {

            "Content-Type": "application/json"

        },

        // The body is a JSON string of the feedback message object
        body: JSON.stringify( feedbackMessage )

    }

    // The request is made and the response is awaited
    const response = await fetch("/dashboard/message", requestMessageObject );

    // If the response was successful, the user will be made aware and the form will be cleared of inputs
    if ( response.ok ) {

        clearFeedbackMessageForm();

        let successHeading = "The Message was Submitted Successfully";

        let successText = "Thank you for submitting your feedback. It was received successfully on the server. The developer will review it as soon as possible.";

        showSuccessModal( successHeading, successText );

        return;

    }

    // If the response was not successful, the user will be made aware through a warning message and inputs remain
    serverErrorModalUI.show();

}

feedbackSubmitButtonUI.onclick = submitFeedbackMessage;

feedbackCancelButtonUI.onclick = clearFeedbackMessageForm;

closeIncompleteModalButtonUI.onclick = () => fieldsIncompleteModalUI.close();

closeServerErrorModalButtonUI.onclick = () => serverErrorModalUI.close();