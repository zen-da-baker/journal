// Import the file reading API from the file system API
import { readFile } from "fs/promises";

// Import the helper function to convert a URL to a file path
import { fileURLToPath } from "url";

// Import the path object
import path from "path";

/*
    This helper function is meant to run once when the server application loads and sends the page content to a global variable.
*/
export async function getPageContentHelper( inputPath: string ): Promise<string> {

    // The initialization of the page content as a string
    let pageContent = "";
    
    /*
        The page contents are assigned through a try/catch block in case of errors so said errors do not crash the web server.
        The final export will either be the intended page or in a rare case a blank page
    */
    try {
    
        // The relative URL from joining the path between the current file and the path relative to this file
        let relativeURL = path.join( import.meta.url, inputPath );
    
        // The relative URL is converted to a file path
        let relativePath = fileURLToPath( relativeURL );
    
        // The relative file path is used to read the base HTML page and store its string contents as a variable for export
        pageContent = await readFile( relativePath, "utf-8" );
    
    } catch( error: any ) {
    
        console.log( error );
    
    }

    return pageContent;

}