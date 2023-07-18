const sql = require("../models/db");
const { promisify } = require('util');


const create = (newPublication, result) => {
    
    sql.query("INSERT INTO publications SET ?", newPublication, (err, res) => {
        
        if (err) {
            result(err, null);
            return;
        }
        result(null, newPublication);
    });
};

const updateById = (publication, id_publication, result) => {

    sql.query(
        "UPDATE publications SET name = ?, description = ?, url_image = ? WHERE id_publication = ? ",
        [publication.name,  publication.description, publication.url_image, id_publication],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null);
                return;
            }
            result(null, { publicacion: publication });
        }
    );

}

const consultAllPublication = (id_user, result) => {
    
    return new Promise((resolve, reject) => {

        sql.query(
            "SELECT * FROM publications WHERE id_user = ?;", [id_user],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    
                    result(null, res);
                }
            }
        );
    });
}


const deletePublication = (id_publication, id_user, result) => {

    sql.query(
        "DELETE FROM publications WHERE id_publication = ? AND id_user = ?", [id_publication, id_user],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null); 
                return;
            }
            result(null, { publicaciones: res });
        }
    );
}


module.exports = {
    create,
    updateById,
    consultAllPublication,
    deletePublication,
}