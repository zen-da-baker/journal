// Import Express framework
import express from "express";

// Import conroller functions
import { getDashboardHomePage } from "../../get-pages/dashboard/getDashboardHomePage.js";
import { getJournalEntryPage } from "../../get-pages/dashboard/getJournalEntryPage.js";
import { getTutorialPage } from "../../get-pages/dashboard/getTutorialPage.js";
import { getCalendarPage } from "../../get-pages/dashboard/getCalendarPage.js";
import { getSettingsPage } from "../../get-pages/dashboard/getSettingsPage.js";
import { storeFeedbackMessage } from "../../post-message/storeFeedbackMessage.js";
import { getLoginPage } from "../../get-pages/dashboard/getLoginPage.js";
import { getSignUpPage } from "../../get-pages/dashboard/getSignUpPage.js";

const dashboardRouter = express.Router();

dashboardRouter.get( "/", getDashboardHomePage );

dashboardRouter.get( "/journal-entry", getJournalEntryPage );

dashboardRouter.get( "/tutorial", getTutorialPage );

dashboardRouter.get( "/calendar", getCalendarPage );

dashboardRouter.get( "/settings", getSettingsPage );

dashboardRouter.get( "/login", getLoginPage );

dashboardRouter.get( "/signup", getSignUpPage );

dashboardRouter.post( "/message", storeFeedbackMessage );

export { dashboardRouter };