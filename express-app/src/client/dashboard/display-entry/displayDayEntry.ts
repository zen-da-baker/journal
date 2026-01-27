// Import data model
import { DayEntryModel } from "../../models/DayEntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

export function displayDayEntry( entry: DayEntryModel) {

    // Get the relavant DOM nodes
    let entryTitleUI = document.getElementById("entry-title");

    let entryBodyUI = document.getElementById("entry-body");

    // Clear the existing HTML so that new content can be added after
    entryTitleUI.innerHTML = "";

    entryBodyUI.innerHTML = "";

    // Assign the title of the entry which will be 
    entryTitleUI.textContent = entry.title;

    entry.listOfLines.forEach( ( line: EntryLineModel ) => {

        let newLine = document.createElement( line.type );

        newLine.id = line.id;

        newLine.textContent = line.value;

        newLine.contentEditable = "true";

    })

}