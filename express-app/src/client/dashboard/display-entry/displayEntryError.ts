export function displayEntryError() {

    // Get the relavant DOM nodes
    let entryTitleUI = document.getElementById("entry-title");

    let entryBodyUI = document.getElementById("entry-body");

    // Clear the existing HTML so that new content can be added after
    entryTitleUI.innerHTML = "";

    entryBodyUI.innerHTML = "";

    // Assign the title to display that an error occured
    entryTitleUI.textContent = "Error Accessing Entry";

    // Create a new paragraph element
    let newParagraph = document.createElement("p");

    // Display the cause of the error in the text of the new paragraph element
    newParagraph.textContent = "The journal entry could not be found.";

    // Add the paragraph element to the page
    entryBodyUI.appendChild( newParagraph );

}