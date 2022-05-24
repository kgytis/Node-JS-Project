import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Minimalistic security module
import cookieParser from 'cookie-parser'; // For JWT storing

// Routes imports



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

app.listen(port, () => {
    console.log(`Server is running on PORT http://localhost:${port}`)
})