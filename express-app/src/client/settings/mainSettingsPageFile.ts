// Import helper functions
import { logoutHelper } from "./logoutHelper.js";
import { changePasswordHelper } from "./changePasswordHelper.js";
import { dataSyncHelper } from "./dataSyncHelper.js";

// Dynamically displayed DOM elements based on the login status
const loginSectionUI = document.getElementById("login-signup-section");
const logoutSectionUI = document.getElementById("logout-section");
const dataSyncSectionUI = document.getElementById("data-sync-section");
const dataSyncSelectionUI = document.getElementById("data-sync-selection") as HTMLSelectElement;

const changePasswordSectionUI = document.getElementById("change-password-section");
const logoutButtonUI = document.getElementById("logout-button");
const changePasswordButtonUI = document.getElementById("confirm-new-password");
const confirmDataSyncSelectionButtonUI = document.getElementById("confirm-data-sync-selection-button");
const cancelDataSyncSelectionUI = document.getElementById("cancel-data-sync-selection-button") as HTMLButtonElement;


let loginStatus: boolean;

if ( localStorage.getItem("bytesized-journal-username") ) {

    loginStatus = true;

} else {

    loginStatus = false;

}

// The data sync variable will be used to determine how journal entries are stored and is defaulted to offline storage
let dataSync: string = "offline only";

if ( loginStatus ) {

    loginSectionUI.style.display = "none";

    // Because the user is logged in, the data
    let dataSyncSelectionString: string | null = localStorage.getItem("bytesized-journal-data-sync-selection");

    // The data sync selection
    if ( dataSyncSelectionString === null ) {

        dataSync = "offline only";

    } else {

        dataSync = dataSyncSelectionString;

    }

    // The default selection value is defaulted here
    dataSyncSelectionUI.value = dataSync;

}

if ( !loginStatus ) {

    logoutSectionUI.style.display = "none";

    changePasswordSectionUI.style.display = "none";

    dataSyncSectionUI.style.display = "none";

}

logoutButtonUI.onclick = logoutHelper;

changePasswordButtonUI.onclick = changePasswordHelper;

cancelDataSyncSelectionUI.onclick = () => dataSyncSelectionUI.value = dataSync;

confirmDataSyncSelectionButtonUI.onclick = () => dataSyncHelper( dataSync );