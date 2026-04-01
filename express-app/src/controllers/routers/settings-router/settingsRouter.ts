// Import Express framework
import express from "express";

// Import controller functions
import { changePasswordHandler } from "../../put-settings/changePasswordHandler.js";
import { getOneEntry } from "../../../database/journal-entry-helpers/getOneEntry.js";
import { getAllEntries } from "../../../database/journal-entry-helpers/getAllEntries.js";
import { updateAllEntries } from "../../../database/journal-entry-helpers/updateAllEntries.js";

const settingsRouter = express.Router();

// Get all journal entries
settingsRouter.get( "/all-entries", getAllEntries );

settingsRouter.get( "/entry", getOneEntry );

// Upload all journal entries as an update
settingsRouter.put( "/all-entries", updateAllEntries );

// settingsRouter.put( "/entry", );

// Change an existing user's password
settingsRouter.put( "/change-password", changePasswordHandler );

// settingsRouter.delete( "/entry", );

export { settingsRouter };