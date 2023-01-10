// Home Page route

const mysql = require('mysql');


// Connection pool
var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});




exports.home = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected to DB ${connection.threadId}`)

        connection.query('select * from users', (err, rows) => {
            connection.release();

            if (!err) {
                res.render('home.hbs', { rows })
            } else {
                console.log(err);
            }
            // console.log("The data from the database is \n", rows);
        });
    });
};

exports.find = (req, res) => {
    const name = req.body.search;
    // console.log(name);
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected to DB ${connection.threadId}`)

        // querry to find the data and send the output
        connection.query('select * from users where usr_firstName like ? or usr_lastName like ?', ['%' + name + '%', '%' + name + '%'], (err, rows) => {
            // Connection release when done
            connection.release();
            if (!err) {
                res.render('home.hbs', { rows })
            } else {
                console.log(err);
            }
            // console.log("The data from the database is \n", rows);
        });
    });
};

exports.newuser = (req, res) => {
    res.render('adduser.hbs')
};

exports.addnewuser = (req, res) => {
    const { usr_firstName, usr_lastName, usr_email, usr_phone, usr_comments } = req.body
    // console.log(req.body);

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected to DB ${connection.threadId}`)

        // Add user query
        connection.query('insert into users (usr_firstName, usr_lastName, usr_email, usr_phone, usr_comments) values(?, ?, ?, ?, ?)', [usr_firstName, usr_lastName, usr_email, usr_phone, usr_comments], (err, rows) => {
            connection.release();

            if (!err) {
                let id = rows.insertId
                res.render('adduser.hbs', { id })
                console.log("Row inserted with id = " + rows.insertId);
            } else {
                console.log(err);
            }
        });
    });
};

exports.edituser = (req, res) => {
    const id = req.params.id
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected to DB ${connection.threadId}`)

        // View user to edit query
        connection.query('select * from users where usr_id = (?)', [id], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('edituser.hbs', { rows })
                console.log(rows);
            } else {
                console.log(err);
            }
        });
    });
};

exports.updateuser = (req, res) => {
    const id = req.params.id
    const { usr_firstName, usr_lastName, usr_email, usr_phone, usr_comments } = req.body
    // console.log(usr_comments);

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected to DB ${connection.threadId}`)

        // Update user query
        connection.query('update users set usr_firstName=?, usr_lastName=?, usr_email=?, usr_phone=?, usr_comments=? where usr_id = ?', [usr_firstName, usr_lastName, usr_email, usr_phone, usr_comments, id], (err, rows) => {
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log(`Connected to DB ${connection.threadId}`)

                    // Add user query
                    connection.query('select * from users where usr_id = (?)', [id], (err, rows) => {
                        connection.release();

                        if (!err) {
                            res.render('edituser.hbs', { rows, alert: `${usr_firstName} has been updated!` })
                            console.log(rows);
                        } else {
                            console.log(err);
                        }
                    });
                });
            } else {
                console.log(err);
            }
        });
    });
};

exports.viewuser = (req, res) => {
    const id = req.params.id
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected to DB ${connection.threadId}`)

        // View user query
        connection.query('select * from users where usr_id = (?)', [id], (err, rows) => {
            connection.release();

            if (!err) {
                res.render('viewuser.hbs', { rows })
                console.log(rows);
            } else {
                console.log(err);
            }
        });
    });
};


exports.deleteuser = (req, res) => {
    const id = req.params.id
    console.log(id);
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected to DB ${connection.threadId}`)

        // Delete user query
        connection.query('delete from users where usr_id = ?', [id], (err, rows) => {
            connection.release();

            if (!err) {
                res.redirect('/')
                // console.log(rows);
            } else {
                console.log(err);
            }
        });
    });
}