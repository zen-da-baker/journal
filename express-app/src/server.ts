import express from "express";

import morgan from "morgan";

import path from "path";

import { fileURLToPath } from "url";

const port = 3000;

const app = express();

// Enable logging using Morgan
app.use( morgan( "dev" ) );

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

// Relative file paths
export const viewsFilePath = path.join(__dirname, "../views");

let clientJavaScriptPath = path.join(__dirname, "../build/client");

// Allow static files from the views and clientside JavaScript to be accessed by the user requesting a page
app.use( express.static( viewsFilePath + "/public" ) );

app.use( express.static( clientJavaScriptPath) );

// Allow the routes to parse the body of requests when they are JSON
app.use( express.json() );

app.get("/", (request, response) => response.send("Hello World!") );

app.listen( port, () => console.log("Listening to port: " + port ) );