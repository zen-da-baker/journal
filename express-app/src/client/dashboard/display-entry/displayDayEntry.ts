// Import data model
import { DayEntryModel } from "../../models/DayEntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

// Import helper functions
import { handleLineEdit } from "./handleLineEdit.js";
import { updateExistingDayEntry } from "../update-entries/updateExistingDayEntry.js";
import { addNewLine } from "./addNewLine.js";
import { focusOnLine } from "./focusOnLine.js";

export function displayDayEntry( entry: DayEntryModel ) {

    // Get the relavant DOM nodes
    let entryTitleUI = document.getElementById("entry-title");

    let entryBodyUI = document.getElementById("entry-body");

    let newLineButtonUI = document.getElementById("new-line-button");

    // Clear the existing HTML so that new content can be added after
    entryTitleUI.innerHTML = "";

    entryBodyUI.innerHTML = "";

    // Assign the title of the entry which will be 
    entryTitleUI.textContent = entry.title;

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

            if ( event.key === "Backspace" || event.key === "Delete" ) {

                let currentLine = document.getElementById( line.id );

                if ( currentLine.textContent === "" ) {

                    console.log("Delete line");

                }

            }

        }

        // Add the line to the DOM
        entryBodyUI.appendChild( newLine );

    })    

    // When the new line button is clicked, create a new paragraph and call the display function again
    newLineButtonUI.onclick = () => addNewLine( entry );

}