// Import Express framework
import express from "express";

// Import controller functions
import { changePasswordHandler } from "../../put-settings/changePasswordHandler.js";

const settingsRouter = express.Router();

settingsRouter.put( "/change-password", changePasswordHandler );

export { settingsRouter };