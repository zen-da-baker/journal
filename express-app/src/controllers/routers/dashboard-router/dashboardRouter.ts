// Import Express framework
import express from "express";

// Import GET conroller functions
import { getDashboardHomePage } from "../../get-pages/dashboard/getDashboardHomePage.js";
import { getJournalEntryPage } from "../../get-pages/dashboard/getJournalEntryPage.js";
import { getTutorialPage } from "../../get-pages/dashboard/getTutorialPage.js";
import { getCalendarPage } from "../../get-pages/dashboard/getCalendarPage.js";
import { getSettingsPage } from "../../get-pages/dashboard/getSettingsPage.js";
import { getLoginPage } from "../../get-pages/dashboard/getLoginPage.js";
import { getSignUpPage } from "../../get-pages/dashboard/getSignUpPage.js";

// Import POST controller functions
import { storeFeedbackMessage } from "../../post-message/storeFeedbackMessage.js";
import { signupHandler } from "../../post-message/signupHandler.js";


const dashboardRouter = express.Router();

// Get page controllers
dashboardRouter.get( "/", getDashboardHomePage );

dashboardRouter.get( "/journal-entry", getJournalEntryPage );

dashboardRouter.get( "/tutorial", getTutorialPage );

dashboardRouter.get( "/calendar", getCalendarPage );

dashboardRouter.get( "/settings", getSettingsPage );

dashboardRouter.get( "/login", getLoginPage );

dashboardRouter.get( "/signup", getSignUpPage );

// Submit feedback message controller
dashboardRouter.post( "/message", storeFeedbackMessage );

// Submit signup form controller
dashboardRouter.post( "/signup", signupHandler );

/*
// Submit login controller
dashboardRouter.post( "/login", );
*/

export { dashboardRouter };