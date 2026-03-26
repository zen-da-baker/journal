// Import data model
import { EntryModel } from "../../models/EntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

// Import helper functions
import { handleLineEdit } from "../update-entries/handleLineEdit.js";
import { addNewLine } from "../update-entries/addNewLine.js";
import { deleteSelectedLine } from "../update-entries/deleteSelectedLine.js";
import { focusOnLine } from "./focusOnLine.js";
import { handleTitleEdit } from "../update-entries/handleTitleEdit.js";
import { displayEntryDate } from "./displayEntryDate.js";
import { removeCurrentEntryPrompt } from "../remove-entry/removeCurrentEntryPrompt.js";

export function displayJournalEntry( entry: EntryModel ): void {

    // Get the relavant DOM nodes
    let entryTitleUI = document.getElementById("entry-title");

    let entryBodyUI = document.getElementById("entry-body");

    let newLineButtonUI = document.getElementById("new-line-button");

    let pageTitle = document.querySelector("title");

    let deleteEntryButtonUI = document.getElementById("delete-current-entry-button");

    let bodyUI = document.querySelector("body")

    let entryDateUI = document.getElementById("entry-date");

    // The modals 
    let newLineModalUI = document.getElementById("new-line-modal") as HTMLDialogElement;

    let lineTypeSelectionUI = document.getElementById("line-type-selection") as HTMLSelectElement;

    let finishLineTypeSelectionUI = document.getElementById("finish-line-type-selection");

    let cancelLineTypeSelectionUI = document.getElementById("cancel-line-type-selection");

    let newImageModalUI = document.getElementById("new-image-modal") as HTMLDialogElement;

    let newImageSourceInputUI = document.getElementById("image-link-input") as HTMLInputElement;

    let newImageAltTextInputUI = document.getElementById("image-alt-text-input") as HTMLInputElement;

    let finishImageAdditionButtonUI = document.getElementById("finish-adding-new-image-button");

    let cancelImageAdditionButtonUI = document.getElementById("cancel-adding-new-image-button");

    let newLineErrorModalUI = document.getElementById("new-line-error-modal") as HTMLDialogElement;

    let newLineErrorHeadingUI = document.getElementById("new-line-error-heading");

    let newLineErrorTextUI = document.getElementById("new-line-error-text");

    let newLineErrorCloseButtonUI = document.getElementById("close-new-line-error-modal");

    let newYouTubeVideoModelUI = document.getElementById("new-youtube-video-modal") as HTMLDialogElement;

    let newYouTubeVideoInputUI = document.getElementById("video-link-input") as HTMLInputElement;

    let finishAddingVideoButtonUI = document.getElementById("finish-adding-video");

    let cancelAddingVideoButtonUI = document.getElementById("cancel-adding-video");

    // Adjust the page colors based on if it is a day or dream journal entry
    if ( entry.type === "dream" ) {

        bodyUI.style.backgroundColor = "hsl( 250, 20%, 20% )";

        entryDateUI.style.color = "white";

    }

    // Clear the existing HTML so that new content can be added after
    entryTitleUI.innerHTML = "";

    entryBodyUI.innerHTML = "";

    // Assign the title of the entry which will be 
    entryTitleUI.textContent = entry.title;

    // Assign the meta data title to be a custom version of the entry title
    pageTitle.textContent = entry.title + " | Bytesized Journal";

    entryTitleUI.onblur = () => handleTitleEdit( entry, entryTitleUI.textContent );

    entryTitleUI.onkeydown = ( event: KeyboardEvent ) => {

        if ( event.key === "Enter") {

            // Prevent the default new line when the user presses enter on the title
            event.preventDefault();

            handleTitleEdit( entry, entryTitleUI.textContent );

            let firstLineId: string = "null";

            let firstLineIndex = 0;

            if ( entry.listOfLines.length === 0 ) {

                // A new line is created and the id of it is returned
                firstLineId = addNewLine( entry, firstLineIndex );

            } else {

                firstLineId = entry.listOfLines[ firstLineIndex ].id;

            }

            setTimeout( () => focusOnLine( firstLineId, 0 ), 5 );

        }
    }

    // Display the entry date on the page
    displayEntryDate( entry );

    // On each line within the entry body
    entry.listOfLines.forEach( ( line: EntryLineModel, index: number ) => {

        let newLine: any;

        if ( line.type === "img" ) {

            newLine = document.createElement("img") as HTMLImageElement;

            newLine.src = line.value;

            newLine.alt = line.altText;

            newLine.className = "journal-image";

        }

        if ( line.type === "youtube-video" ) {

            newLine = document.createElement("iframe") as HTMLIFrameElement;

            newLine.src = "https://www.youtube.com/embed/" + line.value + "?si=Rfs6tTEmr03RcdmC";

            newLine.title = "YouTube video player";

            newLine.frameborder = "0";

            newLine.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

            newLine.referrerpolicy = "strict-origin-when-cross-origin";

            newLine.referrerPolicy = "allowfullscreen";

            newLine.className = "journal-video";

        }

        if ( line.type !== "img" && line.type !== "youtube-video" ) {

            // Create a new line element on the DOM
            newLine = document.createElement( line.type );

            // Assign the text of the line element to the DOM
            newLine.textContent = line.value;

            // Enable editability
            newLine.contentEditable = "true";

        }

        // Assign the id to the DOM element 
        newLine.id = line.id;

        // Add the on blur event listener after the DOM element is created
        newLine.onblur = () => handleLineEdit( line.id, entry, index );

        // Add the key event listeners to the HTML line
        newLine.onkeydown = ( event: KeyboardEvent ) => {

            // If the enter key is pressed, the line is saved, a new line is created, and the focus is set to the new line
            if ( event.key === "Enter" ) {

                // The current line is saved
                handleLineEdit( line.id, entry, index );

                // A new line is created and the id of it is returned
                let newLineId: string = addNewLine( entry, index );

                // Try to set the focus to the newly created line, but if it doesn't exist yet, try to connect to it again
                setTimeout( () => focusOnLine( newLineId, 0 ), 5 );

            }

            // If the backspace or the delete keys are pressed
            if ( event.key === "Backspace" || event.key === "Delete" ) {

                // Get the current line HTML element from the current ID
                let currentLine = document.getElementById( line.id );

                /* 
                    If the text is empty in the current line at the time the backspace or delete 
                    keys are pressed, delete the line
                */
                if ( currentLine.textContent === "" ) {

                    // Delete the line from the entry object and save it to the database
                    deleteSelectedLine( entry, index );

                    // If the current line is not the very first one, set the focus to the previous line
                    if ( index > 0 ) {

                        // Get the previous index position
                        let previousIndex = index - 1;

                        // Get the line ID of the previous line position
                        let previousLineId = entry.listOfLines[ previousIndex ].id;

                        // Attempt to set the focus to the previous line
                        setTimeout( () => focusOnLine( previousLineId, 0 ) );

                    }

                    // Remove the deleted line from the DOM
                    entryBodyUI.removeChild( newLine );                    

                }

            }

        }

        // Add the line to the DOM
        entryBodyUI.appendChild( newLine );

    })    

    function addNewLineAction() {

        let newLineId = addNewLine( entry, entry.listOfLines.length - 1 );

        focusOnLine( newLineId, 0 );
        
    }

    // When the new line button is clicked, the modal for adding a new line is shown 
    newLineButtonUI.onclick = () => {

        newLineModalUI.show();
    
    }

    finishLineTypeSelectionUI.onclick = () => {

        let selectionValue = lineTypeSelectionUI.value;

        // If the selected type is an image or a youtube video, their individual modals are triggered instead
        if ( selectionValue === "img" ) {

            newImageModalUI.show();

            newLineModalUI.close();

            return;

        }

        if ( selectionValue === "youtube-video" ) {

            newYouTubeVideoModelUI.show();

            newLineModalUI.close();

            return;

        }

        newLineModalUI.close();

        let newLineId = addNewLine( entry, entry.listOfLines.length - 1, selectionValue );

        let attemptCount = 0;

        focusOnLine( newLineId, attemptCount );

    }

    // The cancelation button simply closes the modal without an action taken
    cancelLineTypeSelectionUI.onclick = () => {

        lineTypeSelectionUI.value = "p";

        newLineModalUI.close();

    }

    /*
        The finish image addition button when clicked captures the input values and determines what action is taken next.
    */
    finishImageAdditionButtonUI.onclick = () => {

        // The input values are captured
        let imageSource = newImageSourceInputUI.value;

        let altText = newImageAltTextInputUI.value;

        let imageURL: URL;

        // If the image source value is empty, a warning modal is triggered that must be closed before continuing
        try {

            imageURL = new URL( imageSource );

        } catch( error: any ) {

            newLineErrorHeadingUI.textContent = "Image Without Source";

            newLineErrorTextUI.textContent = "The image is lacking a source. Add a source so that the image can load.";

            // Showing the error modal
            newLineErrorModalUI.show();

            return;

        }

        let lineType = "img";

        let newLineId = addNewLine( entry, entry.listOfLines.length - 1, lineType, imageSource, altText );

        let attemptCount = 0;

        focusOnLine( newLineId, attemptCount );

        // The form inputs are reset
        lineTypeSelectionUI.value = "p";

        newImageSourceInputUI.value = "";

        newImageAltTextInputUI.value = "";

        // Closing the image modal after all operations are complete
        newImageModalUI.close();

    }

    /*
        The cancel button closes the image modal and opens the base new line modal again.
    */
    cancelImageAdditionButtonUI.onclick = () => {

        // Input for the image form is cleared
        newImageSourceInputUI.value = "";

        newImageAltTextInputUI.value = "";

        // The image modal is closed
        newImageModalUI.close();

        // The new line modal is shown again
        newLineModalUI.show();

    }

    finishAddingVideoButtonUI.onclick = () => {

        let videoSource = newYouTubeVideoInputUI.value;

        let videoURL: URL;

        try {
        
            videoURL = new URL( videoSource );

        } catch( error: any ) {

            newLineErrorHeadingUI.textContent = "Invalid Link";

            newLineErrorTextUI.textContent = "The input was not a valid website URL.";

            newLineErrorModalUI.show();

            return;

        }

        let videoId: string = "";

        // The invalid link variable starts as true until the YouTube video link is verified
        let invalidLink = true;

        if ( videoURL.hostname === "youtu.be" ) {

            invalidLink = false;

        }

        if ( videoURL.hostname === "www.youtube.com" ) {

            invalidLink = false;

        }

        // If the video link is not from YouTube, it will be rejected
        if ( invalidLink ) {

            newLineErrorHeadingUI.textContent = "Invalid Website";

            newLineErrorTextUI.textContent = "The video link must be from YouTube.";

            newLineErrorModalUI.show();

            return;

        }

        if ( videoURL.hostname === "youtu.be" ) {

            videoId = videoURL.pathname;

        }

        if ( videoURL.hostname === "www.youtube.com" ) {

            let searchParams = videoURL.searchParams;

            videoId = searchParams.get("v");

        }

        let lineType = "youtube-video";

        let newLineId = addNewLine( entry, entry.listOfLines.length - 1, lineType, videoId );

        // The video input is cleared
        newYouTubeVideoInputUI.value = "";

        lineTypeSelectionUI.value = "";

        // Close the YouTube video modal
        newYouTubeVideoModelUI.close();

        let attemptCount = 0;

        // Focus on the id of the new line
        focusOnLine( newLineId, attemptCount );

    }

    cancelAddingVideoButtonUI.onclick = () => {

        // The video input is cleared
        newYouTubeVideoInputUI.value = "";

        // The video modal is closed
        newYouTubeVideoModelUI.close();

        // The new line modal is shown again
        newLineModalUI.show();

    }

    // Error modal close button event
    newLineErrorCloseButtonUI.onclick = () => {

        newLineErrorModalUI.close();

    }

    deleteEntryButtonUI.onclick = () => removeCurrentEntryPrompt( entry );

}