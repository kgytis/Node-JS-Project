import express from 'express';

//Controllers imports
import { allBlogs } from '../../controllers/UI/home.js';
//Middleware imports
import checkToken from '../../middleware/auth/checkToken.js';

const homeRouter = express.Router();

homeRouter.get('/', allBlogs)

export default homeRouter