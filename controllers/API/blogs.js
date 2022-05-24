// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const allBlogs = async (req, res) => {
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
SELECT * 
FROM blog
`;
    const [data] = await con.query(sql);
    res.send(data);
    con.end();
};

const blogByID = async (req, res) => {
    console.log(req.params.id)
    const blogId = req.params.id;
    const con = await mysql.createConnection(mysqlConfig);
    const sql = `
    SELECT * 
    FROM blog
    WHERE id = ?
    `;
    const [data] = await con.query(sql, blogId);
    res.send(data);
    con.end();
};

export { allBlogs, blogByID }