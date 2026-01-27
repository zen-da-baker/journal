import { getDayEntry } from "../get-entries/getDayEntry.js";

const entryTitleUI = document.getElementById("entry-title");

let searchBody = document.location.search;

const paramsObject = new URLSearchParams( searchBody );

const entryID = paramsObject.get("entryId");

console.log( entryID );

let entry = getDayEntry( entryID );

console.log( entry );