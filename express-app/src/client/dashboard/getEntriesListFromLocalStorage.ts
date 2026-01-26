// This function opens the local storage and returns the list from storage given a name or returns nothing
export function getEntriesListFromLocalStorage( listName: string ): Array<any> | null {

    let listItems: Array<any> | null = null;

    let storageResult: string | null = localStorage.getItem( listName );

    if ( typeof storageResult === "string" ) {

        listItems = JSON.parse( storageResult );

    }

    return listItems;

}