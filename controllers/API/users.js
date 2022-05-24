// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const allUsers = async (req, res) => {
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
SELECT * 
FROM user
`;
    const [data] = await con.query(sql);
    res.send(data);
    con.end();
};

const userByID = async (req, res) => {
    console.log(req.params.id)
    const userId = req.params.id;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    SELECT * 
    FROM user
    WHERE id = ?
    `;
    const [data] = await con.query(sql, userId);
    res.send(data);
    con.end();
};

export { allUsers, userByID }