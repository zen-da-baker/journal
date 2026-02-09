// Import Express framework
import express from "express";

// Import conroller functions
import { getDashboardHomePage } from "../../get-pages/dashboard/getDashboardHomePage.js";
import { getJournalEntryPage } from "../../get-pages/dashboard/getJournalEntryPage.js";
import { getTutorialPage } from "../../get-pages/dashboard/getTutorialPage.js";
import { getCalendarPage } from "../../get-pages/dashboard/getCalendarPage.js";
import { getSettingsPage } from "../../get-pages/dashboard/getSettingsPage.js";

const dashboardRouter = express.Router();

dashboardRouter.get( "/", getDashboardHomePage );

dashboardRouter.get( "/journal-entry", getJournalEntryPage );

dashboardRouter.get( "/tutorial", getTutorialPage );

dashboardRouter.get( "/calendar", getCalendarPage );

dashboardRouter.get( "/settings", getSettingsPage );

export { dashboardRouter };