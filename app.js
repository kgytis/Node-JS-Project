import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Minimalistic security module
import cookieParser from 'cookie-parser'; // For JWT storing

// Routes imports

// API Routes
import apiBlogsRouter from './routes/api/blogs.js';
import apiUsersRouter from './routes/api/users.js';

// Auth routes
import registerRouter from './routes/UI/register.js';
import loginRouter from './routes/UI/login.js';
import logoutRouter from './routes/UI/logout.js';

// UI routes
import homeRouter from './routes/UI/home.js';
import userRouter from './routes/UI/user.js';

const app = express();
const port = process.env.PORT;

// Cors setup
const corsOptions = {
    origin: `http://localhost:${port}`,
    optionSucessStatus: 200
};

app.use(express.static(('public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', './views');
app.set('view engine', 'ejs');

// Routes usage
app.use('/api', apiBlogsRouter);
app.use('/api', apiUsersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/', homeRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on PORT http://localhost:${port}`)
})