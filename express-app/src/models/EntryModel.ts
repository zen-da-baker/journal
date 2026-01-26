// Import data models
import { EntryLineModel } from "./EntryLineModel.js";

// Import helper functions
import { createEntryId } from "../client/helpers/createEntryId.js";

export class EntryModel {

    // The id of the object
    id: string = "";

    title: string = "";

    createdOn: string = "";

    lastEdited: string = "";

    // The list of lines are not included in the constructor
    listOfLines: Array<EntryLineModel> = [];

    constructor( inputTitle = "", createdInput = new Date().toString() ) {

        // Create a random ID and assign it to the object
        this.id = createEntryId();

        this.title = inputTitle;

        this.createdOn = createdInput;

    }

}