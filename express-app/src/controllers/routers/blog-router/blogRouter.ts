// Import Express framework
import express from "express";

// Import blog controllers
import { getBlogHomePage } from "../../get-pages/static/blogs/getBlogHomePage.js";
import { getFirstBlogPostPage } from "../../get-pages/static/blogs/getFirstBlogPostPage.js";

const blogRouter = express.Router();

blogRouter.get( "/", getBlogHomePage );
blogRouter.get( "/welcome-internet-traveler", getFirstBlogPostPage );

export { blogRouter };