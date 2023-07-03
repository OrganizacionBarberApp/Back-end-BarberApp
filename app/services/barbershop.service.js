const sql = require("../models/db");
const { promisify } = require('util');


const create = (newBarbershop, result) => {
    
    sql.query("INSERT INTO barbershops SET ?", newBarbershop, (err, res) => {
        
        if (err) {
            result(err, null);
            return;
        }
        result(null, newBarbershop);
    });
};


const updateById = (barbershop, id, result) => {

    sql.query(
        "UPDATE barbershops SET name = ?, cellphone = ?, descrition = ?, location = ?, url_image = ?, qualification = ?, current = ?, creation_date = ?, connection = ? WHERE id_barbershop = ? AND current = ?",
        [barbershop.name, barbershop.cellphone, barbershop.descrition, barbershop.location, barbershop.url_image, barbershop.qualification, barbershop.current, barbershop.creation_date, barbershop.connection, id, 1],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null);
                return;
            }
            result(null, { barbershop: barbershop });
        }
    );

}


const consultAllBarbershop = (result) => {

    sql.query(
        "SELECT * FROM barbershops WHERE current = 1;",
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            result(null, res);
        }
    )
}


const consultBarbershopId = (id_barbershop, current, result) => {

    return new Promise((resolve, reject) => {
        sql.query(
            "SELECT * FROM barbershops WHERE id_barbershop = ? AND current = ?", [id_barbershop, current],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.length > 0) {
                        resolve(res[0]);
                    } else {
                        resolve(null);
                    }
                    
                    resolve(null);
                }
            }
        );
    });
}

const deleteBarbershop = (id_barbershop, result) => {

    let lastConnection = new Date();

    sql.query(
        "UPDATE barbershops SET current = ?, connection = ? WHERE id_barbershop = ? AND current = ?", [0, lastConnection, id_barbershop, 1],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null); 
                return;
            }
            result(null, { barbershop: res });
        }
    );
}


const consultbarbershopByEmail = async (email, current) => {
    return new Promise((resolve, reject) => {
        sql.query(
            "SELECT * FROM barbershops WHERE email = ? AND current = ?", [email, current],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.length > 0) {
                        console.log("res: " + res);
                        resolve(res[0]);
                    } else {
                        resolve(null);
                    }
                    
                    resolve(null);
                }
            }
        );
    });
};


module.exports = {
    create,
    updateById,
    consultAllBarbershop,
    consultBarbershopId,
    deleteBarbershop,
    consultbarbershopByEmail
}