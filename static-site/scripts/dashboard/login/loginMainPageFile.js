// Import helper functions
import { showSuccessModal } from "../modals/showSuccessModal.js";
import { showErrorModal } from "../modals/showErrorModal.js";
// Login DOM elements
const usernameInputUI = document.getElementById("login-username");
const passwordInputUI = document.getElementById("login-password-input");
const submitLoginButtonUI = document.getElementById("login-submit-button");
async function handleLoginSubmission() {
    let username = usernameInputUI.value;
    let password = passwordInputUI.value;
    // Incomplete fields end the function immediately
    if (username === " " || password === " " || username === "" || password === "") {
        let errorHeading = "Submission Incomplete";
        let errorText = "The username and/or password fields are not filled in. Please review the submission.";
        showErrorModal(errorHeading, errorText);
        return;
    }
    let requestBody = {
        username, password
    };
    let requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    };
    const initialResponse = await fetch("/dashboard/login", requestOptions);
    const responseBody = await initialResponse.json();
    if (initialResponse.ok) {
        usernameInputUI.value = "";
        passwordInputUI.value = "";
        localStorage.setItem("bytesized-journal-username", username);
        localStorage.setItem("bytesized-journal-token", JSON.stringify(responseBody.token));
        let successHeading = "Login Successful";
        let successText = "The login was successfully made. Now enjoy the benefits of having an online account with Bytesized Journal.";
        showSuccessModal(successHeading, successText);
        return;
    }
    let errorHeading = "There was an Error on the Server";
    let errorText = responseBody.msg;
    showErrorModal(errorHeading, errorText);
}
submitLoginButtonUI.onclick = handleLoginSubmission;
