import express from "express";

import morgan from "morgan";

import path from "path";

import { fileURLToPath } from "url";

// Import routes
import { getHomePage } from "./controllers/get-pages/getHomePage.js";
import { getAboutPage } from "./controllers/get-pages/static/getAboutPage.js";

// Import dashboard routes
import { dashboardRouter } from "./controllers/routers/dashboard-router/dashboardRouter.js";

// Import blog routes
import { blogRouter } from "./controllers/routers/blog-router/blogRouter.js";

// Error pages
import { getNotFoundPage } from "./controllers/error-handler/getNotFoundPage.js";
import { getErrorPage } from "./controllers/error-handler/getErrorPage.js";

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

// App routes
// Static pages
app.get( "/", getHomePage );
app.get( "/about", getAboutPage );

// The dashboard routes
app.use( "/dashboard", dashboardRouter );

// The blog routes
app.use( "/blog", blogRouter );

// Error handler
app.use( getNotFoundPage );
app.use( getErrorPage );

app.listen(port, () => console.log("App listening to port " + port + "."));