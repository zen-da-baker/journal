// Import Express framework
import express from "express";

// Import controller functions
import { changePasswordHandler } from "../../put-settings/changePasswordHandler.js";
import { getOneEntry } from "../../../database/journal-entry-helpers/getOneEntry.js";

const settingsRouter = express.Router();

// Get all journal entries
// settingsRouter.get( "/all-journal-entries", );

settingsRouter.get( "/entry", getOneEntry );

// Upload all journal entries as an update
// settingsRouter.put( "/all-journal-entries", );

// settingsRouter.put( "/entry", );

// Change an existing user's password
settingsRouter.put( "/change-password", changePasswordHandler );

// settingsRouter.delete( "/entry", );

export { settingsRouter };