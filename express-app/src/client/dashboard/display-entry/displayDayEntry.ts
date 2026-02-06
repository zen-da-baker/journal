// Import data model
import { DayEntryModel } from "../../models/DayEntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

// Import helper functions
import { handleLineEdit } from "./handleLineEdit.js";
import { addNewLine } from "./addNewLine.js";
import { deleteSelectedLine } from "./deleteSelectedLine.js";
import { focusOnLine } from "./focusOnLine.js";
import { handleTitleEdit } from "./handleTitleEdit.js";

export function displayDayEntry( entry: DayEntryModel ): void {

    // Get the relavant DOM nodes
    let entryTitleUI = document.getElementById("entry-title");

    let entryBodyUI = document.getElementById("entry-body");

    let newLineButtonUI = document.getElementById("new-line-button");

    let pageTitle = document.querySelector("title");

    // Clear the existing HTML so that new content can be added after
    entryTitleUI.innerHTML = "";

    entryBodyUI.innerHTML = "";

    // Assign the title of the entry which will be 
    entryTitleUI.textContent = entry.title;

    // Assign the meta data title to be a custom version of the entry title
    pageTitle.textContent = entry.title + " | Bytesized Journal";

    entryTitleUI.onblur = () => handleTitleEdit( entry, entryTitleUI.textContent, "day" );

    // On each line within the entry body
    entry.listOfLines.forEach( ( line: EntryLineModel, index: number ) => {

        // Create a new line element on the DOM
        let newLine = document.createElement( line.type );

        // Assign the id to the DOM element 
        newLine.id = line.id;

        // Assign the text of the line element to the DOM
        newLine.textContent = line.value;

        // Enable editability
        newLine.contentEditable = "true";

        // Add the on blur event listener after the DOM element is created
        newLine.onblur = () => handleLineEdit( line.id, entry, index );

        // Add the key event listeners to the HTML line
        newLine.onkeydown = ( event: KeyboardEvent ) => {

            // If the enter key is pressed, the line is saved, a new line is created, and the focus is set to the new line
            if ( event.key === "Enter" ) {

                // The current line is saved
                handleLineEdit( line.id, entry, index );

                // A new line is created and the id of it is returned
                let newLineId: string = addNewLine( entry );

                // Try to set the focus to the newly created line, but if it doesn't exist yet, try to connect to it again
                setTimeout( () => focusOnLine( newLineId, 0 ), 50 );

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

    // When the new line button is clicked, create a new paragraph and call the display function again
    newLineButtonUI.onclick = () => addNewLine( entry );

}