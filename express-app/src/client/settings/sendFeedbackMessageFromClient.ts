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

async function submitFeedbackMessage() {

    let inputName = formNameUI.value;

    let inputEmail = formEmailUI.value;

    let inputSubject = formSubjectUI.value;

    let inputBody = formBodyUI.value;

    let feedbackMessage = new FeedbackMessage( inputName, inputEmail, inputSubject, inputBody, "Bytesized Journal" );

    let requestMessageObject = {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify( feedbackMessage )

    }

    const response = await fetch("/dashboard/message", requestMessageObject );

    console.log( response );

}

function clearFeedbackMessageForm() {

}

feedbackSubmitButtonUI.onclick = submitFeedbackMessage;

feedbackCancelButtonUI.onclick = clearFeedbackMessageForm;