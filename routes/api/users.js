import express from 'express';

//Controllers imports
import { allUsers, userByID } from '../../controllers/API/users.js';

const apiUsersRouter = express.Router();

apiUsersRouter.get('/users', allUsers);
apiUsersRouter.get('/users/:id', userByID);

export default apiUsersRouter