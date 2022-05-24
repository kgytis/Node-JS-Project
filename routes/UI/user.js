import express from 'express';

//Controllers imports
import { allUserBlogs, newBlog, deleteBlog } from '../../controllers/UI/user.js';
//Middleware imports
import checkToken from '../../middleware/auth/checkToken.js';

const userRouter = express.Router();
userRouter.get('/', checkToken, allUserBlogs);
userRouter.post('/', checkToken, newBlog);
userRouter.delete('/blog/:id', checkToken, deleteBlog);

export default userRouter