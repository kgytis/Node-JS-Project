// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const allBlogs = async (req, res) => {
    console.log(req.userID)
    const con = await mysql.createConnection(mysqlConfig);
    let blogSql = null;
    let userSql = null;
    if (req.userID) {
        blogSql = `
    SELECT * 
    FROM blog
`;
        userSql = `
    SELECT * 
    FROM user
    WHERE id = ?
`;
    } else {
        blogSql = `
    SELECT * 
    FROM blog
    `
    };
    if (blogSql && userSql) {
        const [dataBlog] = await con.query(blogSql);
        const [dataUser] = await con.query(userSql, req.userID);
        con.end();
        //res.send(dataBlog);
        res.send(dataUser);
    } else {
        const [dataBlog] = await con.query(blogSql);
        con.end();
        res.send(dataBlog);
    }
};

export { allBlogs }