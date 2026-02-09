// Import the page content helper function
import { getPageContentHelper } from "../get-page-content/getPageContentHelper.js";

// The higher level paths for the directory structure
let pagesDirectoryPath = "../../../../views/";

// Dashboard directories
let dashboardDirectoryPath = pagesDirectoryPath + "dashboard/";

// Static directories
let staticDirectoryPath = pagesDirectoryPath + "static/";
let blogDirectoryPath = staticDirectoryPath + "blog/";
let errorDirectoryPath = staticDirectoryPath + "error-pages/";

// Relative page paths
// Static pages
let aboutPagePath = staticDirectoryPath + "about.html";

let landingPagePath = staticDirectoryPath + "landingPage.html";

// Dashboard pages
let dashboardHomePagePath = dashboardDirectoryPath + "dashboardHome.html";

let journalEntryPagePath = dashboardDirectoryPath + "journalEntry.html";

let tutorialPagePath = dashboardDirectoryPath + "tutorial.html";

let calendarPagePath = dashboardDirectoryPath + "calendar.html";

let settingsPagePath = dashboardDirectoryPath + "settings.html";

// Blog pages
let blogHomePagePath = blogDirectoryPath + "blogHome.html";

// Error pages
let notFoundPagePath = errorDirectoryPath + "notFound.html";

let serverErrorPagePath = errorDirectoryPath + "serverErrorPage.html";

// All page content variables
// Static pages
let aboutPageContent = await getPageContentHelper( aboutPagePath );

let landingPageContent = await getPageContentHelper( landingPagePath );

// Dashboard pages
let dashboardHomePageContent = await getPageContentHelper( dashboardHomePagePath );

let journalEntryPageContent = await getPageContentHelper( journalEntryPagePath );

let tutorialPageContent = await getPageContentHelper( tutorialPagePath );

let calendarPageContent = await getPageContentHelper( calendarPagePath );

let settingsPageContent = await getPageContentHelper( settingsPagePath );

// Blog pages
let blogHomePageContent = await getPageContentHelper( blogHomePagePath );

// Error pages
let notFoundPageContent = await getPageContentHelper( notFoundPagePath );

let serverErrorPageContent = await getPageContentHelper( serverErrorPagePath );

// Export all of the content files
export { 
    // Static pages
    aboutPageContent, 
    landingPageContent, 

    // Dashboard pages
    dashboardHomePageContent, 
    journalEntryPageContent,
    tutorialPageContent,
    calendarPageContent,
    settingsPageContent,

    // Blog pages
    blogHomePageContent,

    // Error pages
    notFoundPageContent,
    serverErrorPageContent
};