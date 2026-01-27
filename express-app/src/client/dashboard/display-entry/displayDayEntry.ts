// Import data model
import { DayEntryModel } from "../../models/DayEntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

// Import helper functions
import { handleLineEdit } from "./handleLineEdit.js";
import { updateExistingDayEntry } from "../update-entries/updateExistingDayEntry.js";

export function displayDayEntry( entry: DayEntryModel) {

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

        // Add the line to the DOM
        entryBodyUI.appendChild( newLine );

    })    

    // When the new line button is clicked, create a new paragraph and call the display function again
    newLineButtonUI.onclick = () => {

        let nextNewLine = new EntryLineModel("p");

        entry.listOfLines.push( nextNewLine );

        updateExistingDayEntry( entry );

        displayDayEntry( entry );

    }

}