import express from 'express';

//Controllers imports
import { allBlogs, blogByID } from '../../controllers/API/blogs.js';

const apiBlogsRouter = express.Router();

apiBlogsRouter.get('/blog', allBlogs);
apiBlogsRouter.get('/blog/:id', blogByID);

export default apiBlogsRouter