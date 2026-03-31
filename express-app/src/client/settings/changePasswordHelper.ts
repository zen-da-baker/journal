// Import data models
import { Token } from "../models/Token.js";

// Import helper functions
import { showErrorModal } from "../dashboard/modals/showErrorModal.js";
import { showSuccessModal } from "../dashboard/modals/showSuccessModal.js";

// DOM elements for this function to execute
const currentPasswordInputUI = document.getElementById("current-password") as HTMLInputElement;
const firstPasswordInputUI = document.getElementById("first-new-password") as HTMLInputElement;
const secondPasswordInputUI = document.getElementById("second-new-password") as HTMLInputElement;

export async function changePasswordHelper() {

    let username = localStorage.getItem("bytesized-journal-username");

    let tokenString: string | null = localStorage.getItem("bytesized-journal-token");

    let token: Token;

    if ( tokenString !== null ) {

        token = JSON.parse( tokenString );

    }

    let originalPassword = currentPasswordInputUI.value;

    let newPassword1 = firstPasswordInputUI.value;

    let newPassword2 = secondPasswordInputUI.value;

    // First the fields are checked for if they are empty
    if ( originalPassword === "" || newPassword1 === "" || newPassword2 === "" ) {

        let errorHeading = "One or more Fields are Empty";

        let errorText = "";

        showErrorModal( errorHeading, errorText );

        return;

    }

    // Next the confirmation passwords are compared 
    if ( newPassword1 !== newPassword2 ) {

        let errorHeading = "Password Entries Do Not Match";

        let errorText = "The new password entries do not match. Please review the new password again.";

        showErrorModal( errorHeading, errorText );

        return;

    }

    let requestBody = {
        originalPassword, newPassword1, newPassword2, username, token
    }

    // This is a PUT request for updating the existing user information
    let requestOptions = {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"
        
        },

        body: JSON.stringify( requestBody )

    }

    const initialResponse = await fetch( "/settings/change-password", requestOptions );

    const responseBody = await initialResponse.json();

    // The successful server response notification
    if ( initialResponse.ok ) {

        let successHeading = "Password Change Successful";

        let successText = responseBody.msg;

        showSuccessModal( successHeading, successText );

        // Input fields cleared
        currentPasswordInputUI.value = "";

        firstPasswordInputUI.value = "";

        secondPasswordInputUI.value = "";

        return;

    }

    // A failed response notificaion
    let errorHeading = "A Server Error Occured";

    let errorText = responseBody.msg;

    showErrorModal( errorHeading, errorText );

}