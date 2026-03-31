// Import the indexedDB database
import { database } from "./db.js";

// Import data models
import { EntryModel } from "../models/EntryModel.js";

// Import helper functions

// Import helper global variables
import { dayObjectStoreName, dreamObjectStoreName } from "./db.js";

/*
    This helper function would upload all existing journal entries to the web server, expecting the user 
    account to have been created and uses a token for validation. 
    If no journal entries already exist on the device, no action is taken.
*/
export async function uploadAllEntriesToServer() {

    // If the local device does not have token, no action is taken

    // If the local device does not have any journal entries, no action is taken

    // The journal entries are collected as a single list of entries

    // The network request with a PUT method is made to the server

}