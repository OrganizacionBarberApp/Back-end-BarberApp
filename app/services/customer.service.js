const sql = require("../models/db");
const { promisify } = require('util');


const create = (newCustomer, result) => {
    
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        
        if (err) {
            result(err, null);
            return;
        }
        result(null, newCustomer);
    });
};

const updateById = (customer, id, result) => {

    sql.query(
        "UPDATE customers SET name = ?, last_name = ?, email = ?, url_image = ?, google = ?, cellphone = ?, current = ?, connection = ? WHERE id_customer = ? AND current = ?",
        [customer.name, customer.last_name, customer.email, customer.url_image, customer.google, customer.cellphone, customer.current, customer.connection, id, 1],
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

const consultAllCustomer = (result) => {

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

const consultCustomerId = (id_customer, current, result) => {

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

const deleteCustomer = (id_customer, result) => {

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

const consultCustomerByEmail = async (email, current) => {
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
    consultAllCustomer,
    consultCustomerId,
    deleteCustomer,
    consultCustomerByEmail
}