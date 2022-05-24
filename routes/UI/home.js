import express from 'express';

//Controllers imports
import { allBlogs } from '../../controllers/UI/home.js';
//Middleware imports
import checkToken from '../../middleware/auth/checkToken.js';
import authorization from '../../middleware/auth/registered_unregistered.js';

const homeRouter = express.Router();

homeRouter.get('/', authorization, allBlogs);

export default homeRouter