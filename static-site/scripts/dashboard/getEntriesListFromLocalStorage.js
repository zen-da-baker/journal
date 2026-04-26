// This function opens the local storage and returns the list from storage given a name or returns nothing
export function getEntriesListFromLocalStorage(listName) {
    let listItems = null;
    let storageResult = localStorage.getItem(listName);
    if (typeof storageResult === "string") {
        listItems = JSON.parse(storageResult);
    }
    return listItems;
}
