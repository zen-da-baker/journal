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
let lessonsDirectoryPath = staticDirectoryPath + "lessons/";

// Relative page paths
// Static pages
let aboutPagePath = staticDirectoryPath + "about.html";

let landingPagePath = staticDirectoryPath + "landingPage.html";

// Dashboard pages
let adminPagePath = dashboardDirectoryPath + "admin.html";

let dashboardHomePagePath = dashboardDirectoryPath + "dashboardHome.html";

let leaderboardPagePath = dashboardDirectoryPath + "leaderboard.html";

let mathGamePagePath = dashboardDirectoryPath + "mathGame.html";

let settingsPagePath = dashboardDirectoryPath + "settings.html";

let storePagePath = dashboardDirectoryPath + "store.html";

let storyPagePath = dashboardDirectoryPath + "story.html";

// Blog pages
let blogHomePagePath = blogDirectoryPath + "blogHome.html";

// Lessons pages
let lessonsHomePagePath = lessonsDirectoryPath + "lessonsHome.html";

// Error pages
let notFoundPagePath = errorDirectoryPath + "notFound.html";

let serverErrorPagePath = errorDirectoryPath + "serverErrorPage.html";

// All page content variables
// Static pages
let aboutPageContent = await getPageContentHelper( aboutPagePath );

let landingPageContent = await getPageContentHelper( landingPagePath );

// Dashboard pages
let adminPageContent = await getPageContentHelper( adminPagePath );

let dashboardHomePageContent = await getPageContentHelper( dashboardHomePagePath );

let leaderboardPageContent = await getPageContentHelper( leaderboardPagePath );

let mathGamePageContent = await getPageContentHelper( mathGamePagePath );

let settingsPageContent = await getPageContentHelper( settingsPagePath );

let storePageContent = await getPageContentHelper( storePagePath );

let storyPageContent = await getPageContentHelper( storyPagePath );

// Blog pages
let blogHomePageContent = await getPageContentHelper( blogHomePagePath );

// Lessons pages
let lessonsHomePageContent = await getPageContentHelper( lessonsHomePagePath );

// Error pages
let notFoundPageContent = await getPageContentHelper( notFoundPagePath );

let serverErrorPageContent = await getPageContentHelper( serverErrorPagePath );

// Export all of the content files
export { 
    // Static pages
    aboutPageContent, 
    landingPageContent, 

    // Dashboard pages
    adminPageContent, 
    dashboardHomePageContent, 
    leaderboardPageContent,
    mathGamePageContent,
    settingsPageContent,
    storePageContent,
    storyPageContent,

    // Blog pages
    blogHomePageContent,

    // Lessons pages
    lessonsHomePageContent,

    // Error pages
    notFoundPageContent,
    serverErrorPageContent
};