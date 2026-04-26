const errorModalUI = document.getElementById("error-modal");
const errorHeadingUI = document.getElementById("error-heading");
const errorTextUI = document.getElementById("error-text");
const closeErrorModalButtonUI = document.getElementById("close-error-modal");
/*
    This function is capable of displaying an error modal on multiple pages throughout the app by invoking this
    single script with dynamic messages depending on the use case. The function accepts a single heading and text
    that is expected to be a single paragraph element.
*/
function closeErrorModal() {
    errorModalUI.close();
    closeErrorModalButtonUI.removeEventListener("click", closeErrorModal);
}
export function showErrorModal(headingContent, textContent) {
    // The heading and text are dynamically assigned
    errorHeadingUI.textContent = headingContent;
    errorTextUI.textContent = textContent;
    // The close button will now actively close this modal and once called, the event listener is cleared until it is shown again
    closeErrorModalButtonUI.addEventListener("click", closeErrorModal);
    // The modal is shown
    errorModalUI.show();
}
