import { showErrorModal } from "../modals/showErrorModal.js";

const usernameInputUI = document.getElementById("signup-username") as HTMLInputElement;

const emailInputUI = document.getElementById("signup-email") as HTMLInputElement;

const firstPasswordUI = document.getElementById("signup-first-password-input") as HTMLInputElement;

const secondPasswordUI = document.getElementById("signup-second-password-input") as HTMLInputElement;

const signupSubmitButtonUI = document.getElementById("signup-submit-button") as HTMLButtonElement;

/*
    This function validates that the required fields of the form were entered correctly, otherwise
    the form will not submit and an error modal will display.
    The function returns a boolean which will be true if validated and false if there is an error.
*/
function validateSignupForm(): boolean {

}

/*
    This function first uses the form validation function to confirm that all input fields were filled
    then it will submit the form using a POST request. 
*/
function submitSignupForm(): void {

}