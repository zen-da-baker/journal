// Import data models
import { EntryModel } from "../../models/EntryModel.js";
import { EntryLineModel } from "../../models/EntryLineModel.js";

// Import helper functions
import { updateExistingEntry } from "./updateExistingEntry.js";
import { displayJournalEntry } from "../display-entry/displayJournalEntry.js";

/*
    This function creates a new line in the journal entry object. It takes in the entry object and where the new line will be.
    Those are mandatory. The optional values are the type of line being created which defaults to a paragraph. 
    It also takes in the value of the line which will come from the image and video modals for new lines 
    and the alt text for images in particular. The video type's value would be a video id that is extracted from a 
    YouTube URL.
*/
export function addNewLine( 
    entry: EntryModel, 
    selectedLine: number, 
    lineType: string = "p", 
    lineValue: string = "", 
    lineAltText: string = "" 
): string {

    let nextNewLine = new EntryLineModel( lineType );

    nextNewLine.value = lineValue;

    nextNewLine.altText = lineAltText;

    let deleteCount = 0;
    
    entry.listOfLines.splice( selectedLine + 1, deleteCount, nextNewLine );

    updateExistingEntry( entry );

    displayJournalEntry( entry );

    return nextNewLine.id;

}