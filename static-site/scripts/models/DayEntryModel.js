// Import data models
import { EntryModel } from "./EntryModel.js";
/*
    The day entry model extends the base journal entry model with the addition
    of the entry type being day.
*/
export class DayEntryModel extends EntryModel {
    constructor(inputTitle = "") {
        super(inputTitle);
        this.entryType = "";
        this.entryType = "day";
    }
}
