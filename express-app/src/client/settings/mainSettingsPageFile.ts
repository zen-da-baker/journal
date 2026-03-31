// Import helper functions
import { logoutHelper } from "./logoutHelper.js";

// Dynamically displayed DOM elements based on the login status
const loginSectionUI = document.getElementById("login-signup-section");
const logoutSectionUI = document.getElementById("logout-section");

const changePasswordSectionUI = document.getElementById("change-password-section");
const logoutButtonUI = document.getElementById("logout-button");

let loginStatus: boolean;

if ( localStorage.getItem("bytesized-journal-username") ) {

    loginStatus = true;

} else {

    loginStatus = false;

}

if ( loginStatus ) {

    loginSectionUI.style.display = "none";

}

if ( !loginStatus ) {

    logoutSectionUI.style.display = "none";

    changePasswordSectionUI.style.display = "none";

}

logoutButtonUI.onclick = logoutHelper;