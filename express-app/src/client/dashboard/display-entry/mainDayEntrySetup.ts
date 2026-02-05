import { getDayEntry } from "../get-entries/getDayEntry.js";

let searchBody = document.location.search;

const paramsObject = new URLSearchParams( searchBody );

const entryID = paramsObject.get("entryId");

getDayEntry( entryID );