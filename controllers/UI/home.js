// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

// const filterAndSort = {
//     sort: 'creationDateAsc'
// }

const allBlogs = async (req, res) => {
    try {
        console.log(req.userID)
        const con = await mysql.createConnection(mysqlConfig);
        const { sorting } = req.query; // for sorting and filtering
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
        `;
        };

        // SORTING -----------------------------------------------------------------------------
        // Selected xxx Desc
        // if (sorting === 'creationDateDesc') { // prideti filterAndSort.xxx !==
        //     sql += ` ORDER BY blog.created_at DESC`
        // }
        // // Selected genre Asc
        // if (sorting === 'creationDateAsc') { // prideti filterAndSort.xxx !==
        //     sql += ` ORDER BY blog.created_at ASC`
        // }
        // All Desc
        if (sorting === 'creationDateDesc') { // prideti filterAndSort.xxx !==
            blogSql += ` ORDER BY blog.created_at DESC`
        }
        //All Asc
        if (sorting === 'creationDateAsc') { // prideti filterAndSort.xxx !==
            blogSql += ` ORDER BY blog.created_at ASC`
        }
        //-------------------------------------------------------------------------------------

        if (blogSql && userSql) {
            const [dataBlog] = await con.query(blogSql);
            const [dataUser] = await con.query(userSql, req.userID);
            con.end();
            res.send(dataBlog);
            //res.send(dataUser);
        } else {
            const [dataBlog] = await con.query(blogSql);
            con.end();
            res.send(dataBlog);
        }
    } catch (err) {
        res.send({ err: err })
    }

};

export { allBlogs }