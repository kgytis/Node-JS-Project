// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';
// Enryption related imports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginUI = async (req, res) => {
    try {
        res.render('login', {
            title: 'Login',
            style: 'main.css'
        });
    } catch (err) {
        res.send('Page rendering problem. Try again.')
    };
};

const loginUser = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig); // DB connection
        const sql = `
        SELECT *
        FROM user
        WHERE name =?
        `; // SQL query syntax

        const [data] = await con.query(sql, req.body.username); // SQL query
        con.end(); // DB disconnection
        // Password checking (user input vs DB info)
        const match = await bcrypt.compare(req.body.password, data[0].password);
        // Token creation
        if (match) { // If user input matched with DB info, JWT token created
            const token = jwt.sign(
                { // what information is stored within JWT
                    id: data[0].id,
                    email: data[0].email,
                    username: data[0].name
                },
                process.env.JWTSECRET,
                { expiresIn: '1d' }); // If time will allow, prepare token refreshing
            res.cookie('accessToken', token, { httpOnly: true });
            res.redirect('/user');
        } else return res.status(400).send({ err: 'Incorrect username or password.' });
    } catch (err) {
        res.status(500).send({ err: 'Server error' });
    };
};

export { loginUI, loginUser }