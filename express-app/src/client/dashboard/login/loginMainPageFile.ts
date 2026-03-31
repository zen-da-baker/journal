// Import helper functions
import { showSuccessModal } from "../modals/showSuccessModal.js";
import { showErrorModal } from "../modals/showErrorModal.js";

// Login DOM elements
const usernameInputUI = document.getElementById("login-username") as HTMLInputElement;
const passwordInputUI = document.getElementById("login-password-input") as HTMLInputElement;
const submitLoginButtonUI = document.getElementById("login-submit-button") as HTMLButtonElement;

async function handleLoginSubmission() {

    let username = usernameInputUI.value;

    let password = passwordInputUI.value;

    // Incomplete fields end the function immediately
    if ( username === " " || password === " " || username === "" || password === "" ) {

        let errorHeading = "Submission Incomplete";

        let errorText = "The username and/or password fields are not filled in. Please review the submission.";

        showErrorModal( errorHeading, errorText );

        return;

    }

    let requestBody = {
        username, password
    }

    let requestOptions = {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify( requestBody )

    }

    const initialResponse = await fetch( "/dashboard/login", requestOptions );

    console.log( initialResponse );

}

submitLoginButtonUI.onclick = handleLoginSubmission;