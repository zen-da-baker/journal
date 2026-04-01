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
import { updateExistingEntry } from "../update-entries/updateExistingEntry.js";

// Import DOM manipulators
import { showErrorModal } from "../modals/showErrorModal.js";

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

    let newYouTubeVideoModelUI = document.getElementById("new-youtube-video-modal") as HTMLDialogElement;

    let newYouTubeVideoInputUI = document.getElementById("video-link-input") as HTMLInputElement;

    let finishAddingVideoButtonUI = document.getElementById("finish-adding-video");

    let cancelAddingVideoButtonUI = document.getElementById("cancel-adding-video");

    let editExistingImageModalUI = document.getElementById("edit-existing-image") as HTMLDialogElement;

    let existingImageSourceInputUI = document.getElementById("image-source-edit-input") as HTMLInputElement;

    let existingAltTextInputUI = document.getElementById("image-alt-text-edit-input") as HTMLInputElement;

    let finishEditingImageButtonUI = document.getElementById("finish-image-edit");

    let cancelEditingImageButtonUI = document.getElementById("cancel-image-edit");

    let editVideoModalUI = document.getElementById("edit-existing-video") as HTMLDialogElement;

    let editVideoLinkSourceInputUI = document.getElementById("edit-existing-video-source-input") as HTMLInputElement;

    let finishEditingVideoButtonUI = document.getElementById("finish-editing-video-link-button");

    let cancelEditingVideoButtonUI = document.getElementById("cancel-editing-video-link-button");

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

            newLine = document.createElement("div");

            let image = document.createElement("img");

            image.src = line.value;

            image.alt = line.altText;

            let editButtonUI = document.createElement("button");

            editButtonUI.textContent = "Edit";

            editButtonUI.onclick = () => {

                // The existing link and the alt text are the default input text
                existingImageSourceInputUI.value = line.value;

                existingAltTextInputUI.value = line.altText;

                // The input modal is now shown
                editExistingImageModalUI.show();

            }

            // The finish edit button and the cancel button will have their own event listeners below
            finishEditingImageButtonUI.onclick = () => {

                let imageSource = existingImageSourceInputUI.value;

                let imageAltText = existingAltTextInputUI.value;

                let imageURL: URL;

                // Check if the image is a proper URL before saving the changes
                try {

                    imageURL = new URL( imageSource );

                // If the link is not a valid URL, the error modal will be displayed and this function will end
                } catch( error: any ) {

                    let errorTitle = "Invalid Link";

                    let errorText = "The link that was submitted was not a valid URL";

                    showErrorModal( errorTitle, errorText );

                    return;

                }

                // The following statements means that the URL for the image is valid and can be saved
                line.value = imageURL.toString();

                line.altText = imageAltText;

                // After the line values are changed, they will be saved
                updateExistingEntry( entry );

                // The edit line modal will be closed
                editExistingImageModalUI.close();

                // The display of the journal entry will be updated
                displayJournalEntry( entry );

            }

            // When the cancel image edit button is pressed, the modal is simply changed without any edits saved
            cancelEditingImageButtonUI.onclick = () => {

                editExistingImageModalUI.close();

            }


            let deleteButtonUI = document.createElement("button");

            deleteButtonUI.onclick = () => {

                let deleteCount = 1;

                let currentLinePosition = index;

                // The current line is removed from the list of lines
                entry.listOfLines.splice( currentLinePosition, deleteCount );

                // The journal entry is updated in the database
                updateExistingEntry( entry );

                // The journal entry display is updated
                displayJournalEntry( entry );

            }

            deleteButtonUI.textContent = "Delete";

            image.className = "journal-image";

            newLine.className = "flex journal-image-container";

            let buttonContainerUI = document.createElement("div");

            buttonContainerUI.className = "flex flex-column space-around align-items-center";

            newLine.appendChild( image );

            buttonContainerUI.appendChild( editButtonUI );

            buttonContainerUI.appendChild( deleteButtonUI );

            newLine.appendChild( buttonContainerUI );

        }

        if ( line.type === "youtube-video" ) {

            newLine = document.createElement("div");

            // The YouTube video is an iframe as its base
            let videoFrameUI = document.createElement("iframe");

            videoFrameUI.src = "https://www.youtube.com/embed/" + line.value + "?si=Rfs6tTEmr03RcdmC";

            videoFrameUI.title = "YouTube video player";

            videoFrameUI.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

            videoFrameUI.referrerPolicy = "strict-origin-when-cross-origin";

            videoFrameUI.className = "journal-video";

            // The video would need to be embedded within a container that will allow it to have the edit and delete functions
            newLine.appendChild( videoFrameUI );

            newLine.className = "flex journal-video-container";

            let buttonContainerUI = document.createElement("div");

            buttonContainerUI.className = "flex flex-column space-around align-items-center";

            // Button for showing the video edit options modal
            let editButtonUI = document.createElement("button");

            editButtonUI.textContent = "Edit Video Link"

            // The edit button opens the video edit modal
            editButtonUI.onclick = () => {

                editVideoModalUI.show();

            }

            // The confirmation button takes different action depending on which video had it's edit button pressed
            finishEditingVideoButtonUI.onclick = () => {

                let videoSourceInput = editVideoLinkSourceInputUI.value;

                // First, determine if the link is a valid URL
                let videoURL: URL;

                try {

                    videoURL = new URL( videoSourceInput );

                // If the link is not a valid URL, the error modal is shown and the function ends before action is taken
                } catch( error: any ) {

                    let errorTitle = "Invalid Link";

                    let errorText = "The link that was entered is not a valid URL. Please review the link.";

                    showErrorModal( errorTitle, errorText );

                    return;

                }

                // Next, the URL must be from a valid YouTube origin
                let invalidLink = true;

                if ( videoURL.hostname === "www.youtube.com" || videoURL.hostname === "youtu.be" ) {

                    invalidLink = false;

                }

                // If the link was not from a YouTube origin, the error modal is shown and the function will end
                if ( invalidLink ) {

                    let errorTitle = "Invalid Link";

                    let errorText = "The link submitted does not appear to be from YouTube. Please review it.";

                    showErrorModal( errorTitle, errorText );

                    return;

                }

                let videoId: string;

                if ( videoURL.hostname === "youtu.be" ) {

                    videoId = videoURL.pathname;

                }

                if ( videoURL.hostname === "www.youtube.com" ) {

                    let searchParams = videoURL.searchParams;

                    videoId = searchParams.get("v");

                }

                // The value of the line is now assigned to the video ID
                line.value = videoId;

                // Close the modal when no longer in use
                editVideoModalUI.close();

                // The input value is cleared when no longer in use
                editVideoLinkSourceInputUI.value = "";

                // The journal entry is updated in the database
                updateExistingEntry( entry );

                // The page is updated with the new data
                displayJournalEntry( entry );

            }

            // The cancel button for editing the video link simply closes the modal without action being taken
            cancelEditingVideoButtonUI.onclick = () => {

                editVideoModalUI.close();

            }

            // Button for deleting the current line
            let deleteButtonUI = document.createElement("button");

            deleteButtonUI.textContent = "Delete Video from Entry";

            deleteButtonUI.onclick = () => {

                let deleteCount = 1;

                entry.listOfLines.splice( index, deleteCount );

                updateExistingEntry( entry );

                displayJournalEntry( entry );

            }

            buttonContainerUI.appendChild( editButtonUI );

            buttonContainerUI.appendChild( deleteButtonUI );

            newLine.appendChild( buttonContainerUI );

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

            let errorTitle = "Image Without Source";

            let errorText = "The image is lacking a source. Add a source so that the image can load.";

            // Showing the error modal
            showErrorModal( errorTitle, errorText );

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

            let errorTitle = "Invalid Link";

            let errorText = "The input was not a valid website URL.";

            showErrorModal( errorTitle, errorText );

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

            let errorTitle = "Invalid Website";

            let errorText = "The video link must be from YouTube.";

            showErrorModal( errorTitle, errorText );

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

    deleteEntryButtonUI.onclick = () => removeCurrentEntryPrompt( entry );

}