// Import Express framework
import express from "express";

// Import conroller functions
import { getDashboardHomePage } from "../../get-pages/dashboard/getDashboardHomePage.js";
import { getDayEntryPage } from "../../get-pages/dashboard/getDayEntryPage.js";
import { getDreamEntryPage } from "../../get-pages/dashboard/getDreamEntryPage.js";
import { getCalendarPage } from "../../get-pages/dashboard/getCalendarPage.js";
import { getSettingsPage } from "../../get-pages/dashboard/getSettingsPage.js";

const dashboardRouter = express.Router();

dashboardRouter.get( "/", getDashboardHomePage );

dashboardRouter.get( "/day-entry", getDayEntryPage );

dashboardRouter.get( "/dream-entry", getDreamEntryPage );

dashboardRouter.get( "/calendar", getCalendarPage );

dashboardRouter.get( "/settings", getSettingsPage );

export { dashboardRouter };