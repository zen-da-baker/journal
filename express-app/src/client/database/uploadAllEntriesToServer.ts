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
export async function uploadAllEntriesToServer(): Promise<boolean> {

    let userToken: string | null = localStorage.getItem("bytesized-journal-token");

    // If the local device does not have token, no action is taken
    if ( userToken === null ) {

        return false;

    }

    // If the local device does not have any journal entries, no action is taken

    let dayEntriesCount: number = 0;

    let dreamEntriesCount: number = 0;

    let dayEntriesJson: string | null = localStorage.getItem("bytesized-journal-day-entries-list");

    let dreamEntriesJson: string | null = localStorage.getItem("bytesized-journal-dreams-entries-list");

    if ( dayEntriesJson === null ) {

        dayEntriesCount = 0;

    } else {

        let dayEntriesList: Array<any> = JSON.parse( dayEntriesJson );

        dayEntriesCount = dayEntriesList.length;

    }

    if ( dreamEntriesJson === null ) {

        dreamEntriesCount = 0;

    } else {

        let dreamEntriesList: Array<any> = JSON.parse( dreamEntriesJson );

        dreamEntriesCount = dreamEntriesList.length;

    }

    let totalCount = dayEntriesCount + dreamEntriesCount;

    if ( totalCount === 0 ) {

        return false;

    }

    if ( database !== null ) {

        // Now that it is known that there are journal entries, upload them
        const dayTransaction = database.transaction( dayObjectStoreName, "readonly" );

        const dreamTransaction = database.transaction( dreamObjectStoreName, "readonly" );

        const dayObjectStore = dayTransaction.objectStore( dayObjectStoreName );

        const dreamObjectStore = dreamTransaction.objectStore( dreamObjectStoreName );

        let dayRequest: IDBRequest = dayObjectStore.count();

        let dreamRequest: IDBRequest = dreamObjectStore.count();

        // If day entries exist in the indexedDB database, perform the PUT network request
        dayRequest.onsuccess = async () => {

            dayEntriesCount = dayRequest.result;

            if ( dayEntriesCount !== 0 ) {

                dayRequest = dayObjectStore.getAll();

                let dayEntriesList: Array<EntryModel> = dayRequest.result;

                const requestBody = {

                    entriesList: dayEntriesList,

                    token: userToken

                }

                const requestOptions = {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify( requestBody )

                }

                const initialResponse: Response = await fetch( "/settings/all-entries", requestOptions );

                const responseBody = await initialResponse.json();

                console.log( responseBody );

            }
    
        }

        dreamRequest.onsuccess = async () => {

            dreamEntriesCount = dreamRequest.result;

            if ( dreamEntriesCount !== 0 ) {

                dreamRequest = dreamObjectStore.getAll();

                let dreamEntriesList: Array<EntryModel> = dreamRequest.result;

                const requestBody = {

                    entriesList: dreamEntriesList,

                    token: userToken

                }

                const requestOptions = {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify( requestBody )

                }

                const initialResponse: Response = await fetch( "/settings/all-entries", requestOptions );

                const responseBody = await initialResponse.json();

                console.log( responseBody );

            }
    
        }

        return true;
    
    }

    // The journal entries are collected as a single list of entries

    // The network request with a PUT method is made to the server

    return true;

}