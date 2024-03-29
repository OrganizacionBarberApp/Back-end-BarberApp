const sql = require("../models/db");
const { promisify } = require('util');


const create = (newcustomer, result) => {
    
    sql.query("INSERT INTO customers SET ?", newcustomer, (err, res) => {
        
        if (err) {
            result(err, null);
            return;
        }
        result(null, newcustomer);
    });
};


const updateById = (customer, id, result) => {

    sql.query(
        "UPDATE customers SET name = ?, last_name = ?, email = ?, password = ?, url_image = ?, city = ?, google = ?, cellphone = ?, current = ?, connection = ? WHERE id_customer = ? AND current = ?",
        [customer.name, customer.last_name, customer.email, customer.password, customer.url_image, customer.city, customer.google, customer.cellphone, customer.current, customer.connection, id, 1],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null);
                return;
            }
            result(null, { usuario: customer });
        }
    );

}


const consultAllcustomer = (result) => {

    sql.query(
        "SELECT * FROM customers WHERE current = 1;",
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            result(null, res);
        }
    )
}


const consultcustomerId = (id_customer, current, result) => {

    return new Promise((resolve, reject) => {
        sql.query(
            "SELECT * FROM customers WHERE id_customer = ? AND current = ?", [id_customer, current],
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

const deletecustomer = (id_customer, result) => {

    let lastConnection = new Date();

    sql.query(
        "UPDATE customers SET current = ?, connection = ? WHERE id_customer = ? AND current = ?", [0, lastConnection, id_customer, 1],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null); 
                return;
            }
            result(null, { usuario: res });
        }
    );
}


const consultcustomerByEmail = async (email, current) => {
    return new Promise((resolve, reject) => {
        sql.query(
            "SELECT * FROM customers WHERE email = ? AND current = ?", [email, current],
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
    consultAllcustomer,
    consultcustomerId,
    deletecustomer,
    consultcustomerByEmail
}