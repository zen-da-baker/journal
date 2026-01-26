// Import data models
import { EntryModel } from "./EntryModel.js";

/*
    The day entry model extends the base journal entry model with the addition
    of the entry type being day.
*/
export class DayEntryModel extends EntryModel {

    entryType: string = "";

    constructor( inputTitle: string = "" ) {

        super( inputTitle );

        this.entryType = "day";

    }

}