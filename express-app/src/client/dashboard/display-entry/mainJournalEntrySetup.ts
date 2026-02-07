// Import helper functions
import { getJournalEntryData } from "../get-entries/getJournalEntryData.js";

// Get the search parameters from the URL
let searchBody = document.location.search;

// Create an object for parsing the search parameters
const paramsObject = new URLSearchParams( searchBody );

// Get the entry ID and entry type from the query paremeters
const entryID = paramsObject.get("entryId");

const entryType = paramsObject.get("entryType");

// Run the helper function to get the journal entry data based on the entry id and the entry type
getJournalEntryData( entryID, entryType );