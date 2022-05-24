// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const allUsers = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
        SELECT * 
        FROM user
        `;
        const [data] = await con.query(sql);
        con.end();
        res.send(data);
    } catch (err) {
        res.send({ err: err });
    };
};

const userByID = async (req, res) => {
    try {
        const userId = req.params.id;
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
        SELECT * 
        FROM user
        WHERE id = ?
        `;
        const [data] = await con.query(sql, userId);
        con.end();
        res.send(data);
    } catch (err) {
        res.send({ err: err });
    };
};

export { allUsers, userByID }