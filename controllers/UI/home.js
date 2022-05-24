// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

// const filterAndSort = {
//     sort: 'creationDateAsc'
// }

const allBlogs = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const { sorting } = req.query; // for sorting and filtering
        console.log(sorting)
        const userData = {
            userID: req.userID,
            email: req.email,
            username: req.username
        }
        let sql = `
        SELECT * 
        FROM blog
        `
        // SORTING -----------------------------------------------------------------------------
        // Selected xxx Desc
        // if (sorting === 'creationDateDesc') { // prideti filterAndSort.xxx !==
        //     sql += ` ORDER BY blog.created_at DESC`
        // }
        // // Selected xxx Asc
        // if (sorting === 'creationDateAsc') { // prideti filterAndSort.xxx !==
        //     sql += ` ORDER BY blog.created_at ASC`
        // }
        // All Desc
        if (sorting === 'creationDateDesc') { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.created_at DESC`
        }
        //All Asc
        if (sorting === 'creationDateAsc') { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.created_at ASC`
        }
        //-------------------------------------------------------------------------------------
        const [data] = await con.query(sql);
        con.end();
        //const creationDate = data[1].created_at.toLocaleString('LT').slice(0, 10) // jei prireiks isvedimui
        res.render('home', {
            title: "Blogs",
            blogs: data,
            userData: userData
        })
    } catch (err) {
        res.send({ err: err })
    }

};

export { allBlogs }