import { EntryLineModel } from "../../models/EntryLineModel.js";
// Import helper functions
import { updateExistingDayEntry } from "../update-entries/updateExistingDayEntry.js";
import { displayDayEntry } from "./displayJournalEntry.js";
export function addNewLine(entry) {
    let nextNewLine = new EntryLineModel("p");
    entry.listOfLines.push(nextNewLine);
    updateExistingDayEntry(entry);
    displayDayEntry(entry);
    return nextNewLine.id;
}
