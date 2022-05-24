import express from 'express';

//Controllers imports
import { loginUser, loginUI } from '../../controllers/auth/login.js';
//Middleware imports
import loginValidation from '../../middleware/auth/login.js';

const loginRouter = express.Router();

loginRouter.get('/', loginUI);
loginRouter.post('/', loginValidation, loginUser);

export default loginRouter