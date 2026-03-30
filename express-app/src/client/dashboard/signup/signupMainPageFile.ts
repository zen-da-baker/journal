import { showErrorModal } from "../modals/showErrorModal.js";

const usernameInputUI = document.getElementById("signup-username") as HTMLInputElement;

const firstPasswordUI = document.getElementById("signup-first-password-input") as HTMLInputElement;

const secondPasswordUI = document.getElementById("signup-second-password-input") as HTMLInputElement;

const signupSubmitButtonUI = document.getElementById("signup-submit-button") as HTMLButtonElement;

/*
    This function validates that the required fields of the form were entered correctly, otherwise
    the form will not submit and an error modal will display.
    The function returns a boolean which will be true if validated and false if there is an error.
*/
function validateSignupForm(): boolean {

    let username = usernameInputUI.value;

    let password1 = firstPasswordUI.value;

    let password2 = secondPasswordUI.value;

    let errorTitle = "";

    let errorText = "";

    // Empty fields are checked for
    if ( username === "" || password1 === "" || password2 === "" ||
        username === " " || password1 === " " || password2 === " "
     ) {

        errorTitle = "Field(s) Missing";

        errorText = "One or more of the fields of the signup form are missing. Please fill each of them.";

        showErrorModal( errorTitle, errorText );

        return false;
        
    }

    // The password and its confirmation are checked to see if it is a match
    if ( password1 !== password2 ) {

        errorTitle = "Password Confirmation Not a Match";

        errorText = "The confirmation password provided does not match the original. Please review the password again.";

        showErrorModal( errorTitle, errorText );

        return false;

    }

    // If both of the validation steps are passed, the function returns true
    return true;

}

/*
    This function first uses the form validation function to confirm that all input fields were filled
    then it will submit the form using a POST request. 
*/
async function submitSignupForm(): Promise<void> {

    let formValidated = validateSignupForm();

    if ( formValidated === false ) {

        return;

    }

    let username = usernameInputUI.value;

    let password1 = firstPasswordUI.value;

    let password2 = secondPasswordUI.value;

    // The submission body is a fairly plain object containing the inputs of the field
    let submissionBody = {

        username, password1, password2

    }

    let requestOptions = {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify( submissionBody )

    }

    const initialResponse = await fetch("/dashboard/signup", requestOptions );

    const responseBody = await initialResponse.json();

    // If the signup was successful, store the necessary details in the local storage for use upon revisiting
    if ( initialResponse.ok ) {

        localStorage.setItem("bytesized-journal-token", JSON.stringify( responseBody.token ) );

        localStorage.setItem("bytesized-journal-username", username );

        console.log( responseBody.msg );

        // After a successful submission, the input fields are cleared
        usernameInputUI.value = "";

        firstPasswordUI.value = "";

        secondPasswordUI.value = "";

        return;

    }

    console.log( responseBody );

    let errorHeading = "An Error Occured on the Server";

    let errorText = responseBody.msg;

    showErrorModal( errorHeading, errorText );

}

signupSubmitButtonUI.onclick = submitSignupForm;