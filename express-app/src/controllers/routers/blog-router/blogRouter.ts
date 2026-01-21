// Import Express framework
import express from "express";

// Import blog controllers
import { getBlogHomePage } from "../../get-pages/static/blogs/getBlogHomePage.js";

const blogRouter = express.Router();

blogRouter.get( "/", getBlogHomePage );

export { blogRouter };