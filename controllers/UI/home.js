// DB related imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';

const filterAndSort = {

}
const allBlogs = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const { sorting, search } = req.query; // for sorting and filtering
        const userData = {
            userID: req.userID,
            email: req.email,
            username: req.username
        };
        let sql = `
        SELECT * 
        FROM blog
        INNER JOIN user
        ON blog.author_id = user.id
        `;
        // SORTING -----------------------------------------------------------------------------
        //
        if (search) {
            filterAndSort.search = search
            sql += ` WHERE blog.title LIKE ?`
        };

        if (sorting === 'creationDateDesc' && filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` WHERE blog.title LIKE ? ORDER BY blog.created_at DESC`;
        };
        //Search all Asc
        if (sorting === 'creationDateAsc' && filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` WHERE blog.title LIKE ? ORDER BY blog.created_at ASC`;
        };
        // Search title Asc
        if (sorting === 'titleAsc' && filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` WHERE blog.title LIKE ? ORDER BY blog.title ASC`
        };
        // Search title Desc
        if (sorting === 'titleDesc' && filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` WHERE blog.title LIKE ? ORDER BY blog.title DESC`
        };

        // All Desc
        if (sorting === 'creationDateDesc' && !filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.created_at DESC`;
        };
        //All Asc
        if (sorting === 'creationDateAsc' && !filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.created_at ASC`;
        };
        // All title Asc
        if (sorting === 'titleAsc' && !filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.title ASC`
        };
        // All title Desc
        if (sorting === 'titleDesc' && !filterAndSort.search) { // prideti filterAndSort.xxx !==
            sql += ` ORDER BY blog.title DESC`
        };
        //-------------------------------------------------------------------------------------
        let searchParameter = '%' + filterAndSort.search + '%'
        const [data] = await con.query(sql, [searchParameter]);
        con.end();
        //const creationDate = data[1].created_at.toLocaleString('LT').slice(0, 10) // jei prireiks isvedimui
        res.render('home', {
            title: "Blogs",
            blogs: data,
            userData: userData
        });
    } catch (err) {
        res.send({ err: err });
    };
};

export { allBlogs }