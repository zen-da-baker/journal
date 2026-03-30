const successModalUI = document.getElementById("success-modal") as HTMLDialogElement;

const successHeadingUI = document.getElementById("success-heading");

const successTextUI = document.getElementById("success-text");

const successModalButtonUI = document.getElementById("close-success-modal") as HTMLButtonElement;

function closeSuccessModal() {

    successModalUI.close();

    successModalUI.removeEventListener( "click", closeSuccessModal );

}

export function showSuccessModal( heading: string, text: string ) {

    // The heading and text are dynamically assigned
    successHeadingUI.textContent = heading;

    successTextUI.textContent = text;

    // The close button will now actively close this modal and once called, the event listener is cleared until it is shown again
    successModalButtonUI.addEventListener( "click", closeSuccessModal );

    // The modal is shown
    successModalUI.show();

}