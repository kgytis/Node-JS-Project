// Registration controlling
// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

//Encryption related imports
import bcrypt from 'bcryptjs';

// UI
const registrationUI = async (req, res) => {
    try {
        res.render('registration', {
            title: 'Registration form',
            style: 'main.css'
        });
    } catch (err) {
        res.send('Page rendering problem. Try again.');
    };
};

// Crypting
const newUser = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const hashedPassword = await bcrypt.hash(req.body.password, 5); // Password hasing <--hashed 5 times
        const sql = `
        INSERT INTO user
        (name, email, password, register_time)
        VALUES (?, ?, ?, ?)
        `;
        const registerTime = new Date().toLocaleString('LT');
        const [data] = await con.query(sql, [req.body.username, req.body.email, hashedPassword, registerTime]);
        con.end();
        res.send(data); // After testing in Postman, redirect to home page with all blogs.
    } catch (err) {
        return res.status(500).send({ msg: err });
    };
};

export { registrationUI, newUser }