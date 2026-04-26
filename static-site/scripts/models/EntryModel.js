// Import helper functions
import { createEntryId } from "../helpers/createEntryId.js";
export class EntryModel {
    constructor(inputType = "day", inputTitle = "Untitled Entry") {
        // The id of the object
        this.id = "";
        this.title = "";
        this.createdOn = "";
        this.lastEdited = "";
        this.type = "";
        // The list of lines are not included in the constructor
        this.listOfLines = [];
        // Create a random ID and assign it to the object
        this.id = createEntryId();
        this.type = inputType;
        this.title = inputTitle;
        let currentDate = new Date();
        this.createdOn = currentDate.toString();
    }
}
