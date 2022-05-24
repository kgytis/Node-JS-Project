// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const allBlogs = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
        SELECT * 
        FROM blog
        `;
        const [data] = await con.query(sql);
        con.end();
        res.send(data);
    } catch (err) {
        res.send({ err: err });
    };
};

const blogByID = async (req, res) => {
    try {
        console.log(req.params.id)
        const blogId = req.params.id;
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
    SELECT * 
    FROM blog
    WHERE id = ?
    `;
        const [data] = await con.query(sql, blogId);
        con.end();
        res.send(data);
    } catch (err) {
        res.send({ err: err });
    };
};

export { allBlogs, blogByID }