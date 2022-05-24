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

export { allBlogs }