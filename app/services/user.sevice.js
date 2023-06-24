const sql = require("../models/db");
const { promisify } = require('util');

const create = (newUser, result) => {
    
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        console.log("service", res)
        if (err) {
            result(err, null);
            return;
        }
        result(null, newUser);
    });
};

const updateById = (user, id, result) => {

    sql.query(
        "UPDATE users SET name = ?, last_name = ?, email = ?, password = ?, url_image = ?, google = ?, cellphone = ?, current = ?, connection = ? WHERE id = ? AND current = ?",
        [user.name, user.last_name, user.email, user.password, user.url_image, user.google, user.cellphone, user.current, user.connection, id, 1],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "No_Encontrado" }, null);
                return;
            }
            result(null, { usuario: user });
        }
    );


}

const consultAllUser = (result) => {

    sql.query(
        "SELECT * FROM users WHERE current = 1;",
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            result(null, res);
        }
    )

}

const consultUserId = (id_user, result) => {

    sql.query(
        "SELECT * FROM users WHERE id = ? AND current = ?", [id_user, 1],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            result(null, res);
        }
    )

}



const consultUserEmail = async (email, result) => {

  sql.query(
    "SELECT * FROM users WHERE email = ? AND current = ?",[email, 1],
    (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        
        result(null, res);
    }
)


};


const deleteUser = (id_user, result) => {

    let lastConnection = new Date();

    sql.query(
        "UPDATE users SET current = ?, connection = ? WHERE id = ? AND current = ?", [0, lastConnection, id_user, 1],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "No_Encontrado" }, null);
                return;
            }
            result(null, { usuario: res });
        }
    );

}


module.exports = {
    create,
    updateById,
    consultAllUser,
    consultUserId,
    deleteUser,
    consultUserEmail

}