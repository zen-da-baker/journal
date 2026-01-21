import express from "express";

import { getLessonsHomePage } from "../../get-pages/lessons/getLessonsHomePage.js";

const lessonsRouter = express.Router();

lessonsRouter.get( "/", getLessonsHomePage );

export { lessonsRouter };