// Import Express framework
import express from "express";

// Import controller functions
import { changePasswordHandler } from "../../put-settings/changePasswordHandler.js";

const settingsRouter = express.Router();

// Get all journal entries
settingsRouter.get( "/all-journal-entries", );

// Upload all journal entries as an update
settingsRouter.put( "all-journal-entries", );

// Change an existing user's password
settingsRouter.put( "/change-password", changePasswordHandler );

export { settingsRouter };