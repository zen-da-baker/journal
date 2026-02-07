// Import data models
import { EntryLineModel } from "./EntryLineModel.js";

// Import helper functions
import { createEntryId } from "../helpers/createEntryId.js";

export class EntryModel {

    // The id of the object
    id: string = "";

    title: string = "";

    createdOn: string = "";

    lastEdited: string = "";

    type: string = "";

    // The list of lines are not included in the constructor
    listOfLines: Array<EntryLineModel> = [];

    constructor( inputType: string = "day", inputTitle = "Untitled Entry" ) {

        // Create a random ID and assign it to the object
        this.id = createEntryId();

        this.type = inputType;

        this.title = inputTitle;

        let currentDate = new Date();

        this.createdOn = currentDate.toString();

    }

}