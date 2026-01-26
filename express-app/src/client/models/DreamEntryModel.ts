// Import data models
import { EntryModel } from "./EntryModel.js";

/*
    The dream entry extends the base entry model with the addition of the entry type
*/
export class DreamEntryModel extends EntryModel {

    entryType: string = "";

    constructor( inputTitle: string = "" ) {

        super( inputTitle );

        this.entryType = "dream";

    }

}