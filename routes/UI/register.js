import express from 'express';

//Controllers imports
import { newUser, registrationUI } from '../../controllers/auth/register.js';
//Middleware imports
import registerValidation from '../../middleware/auth/register.js';

const registerRouter = express.Router();

registerRouter.get('/', registrationUI)
registerRouter.post('/', registerValidation, newUser)

export default registerRouter