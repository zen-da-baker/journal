// Import data models
import { EntryModel } from "./EntryModel.js";
/*
    The dream entry extends the base entry model with the addition of the entry type
*/
export class DreamEntryModel extends EntryModel {
    constructor(inputTitle = "") {
        super(inputTitle);
        this.entryType = "";
        this.entryType = "dream";
    }
}
