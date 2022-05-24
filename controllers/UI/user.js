// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const allUserBlogs = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const userID = req.userID;
        let sql = `
    SELECT blog.*, user.name, user.email, user.register_time
    FROM blog
    INNER JOIN user
    ON blog.author_id = user.id
    WHERE author_id = ?
    `
        const [data] = await con.query(sql, userID);
        //console.log(data[1].created_at.toLocaleString('LT').slice(0, 10)) // jei prireiks isvedimui
        con.end();
        res.send(data);
    } catch (err) {
        res.send({ err: err })
    }
};

const newBlog = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const userID = req.userID;
        const { title, content } = req.body
        console.log(title);
        console.log(content);
        const creationTime = new Date().toLocaleString('LT');
        let sql = `
    INSERT INTO blog (author_id, title, content, created_at)
    VALUES (?, ?, ?, ?)
    `
        await con.query(sql, [userID, title, content, creationTime]);
        con.end();
        res.redirect('/user')
    }
    catch (err) {
        res.send({ err: err })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const [, , id] = req.url.split('/');
        const userID = req.userID;
        const sql = `
    DELETE 
    FROM blog
    WHERE id = ? AND author_id = ?
    `
        await con.query(sql, [id, userID]); // additionally checking whether author_id matched that other user could not delete other users blogs.
        con.end();
        res.redirect('/') // later update redirections
    }
    catch (err) {
        res.send({ err: err })
    };
};

export { allUserBlogs, newBlog, deleteBlog }