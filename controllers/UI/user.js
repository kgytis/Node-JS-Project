// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const allUserBlogs = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const { sorting } = req.query; // for sorting and filtering
        const userData = {
            userID: req.userID,
            email: req.email,
            username: req.username
        }
        let sql = `
    SELECT blog.*, user.name, user.email, user.register_time
    FROM blog
    INNER JOIN user
    ON blog.author_id = user.id
    WHERE author_id = ?
    `
        // SORTING -----------------------------------------------------------------------------
        //All Date creation Desc
        if (sorting === 'creationDateDesc') { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.created_at DESC`
        }
        //All Date creation Asc
        if (sorting === 'creationDateAsc') { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.created_at ASC`
        }
        if (sorting === 'titleAsc') { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.title ASC`
        }
        if (sorting === 'titleDesc') { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.title DESC`
        }
        //-------------------------------------------------------------------------------------    
        const [data] = await con.query(sql, userData.userID);
        //console.log(data[1].created_at.toLocaleString('LT').slice(0, 10)) // jei prireiks isvedimui
        con.end();
        res.render('user', {
            title: "Blogs",
            blogs: data,
            userData: userData
        })
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