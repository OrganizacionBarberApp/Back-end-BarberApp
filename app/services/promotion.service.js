const sql = require("../models/db");
const { promisify } = require('util');


const create = (newPromotion, result) => {
    
    sql.query("INSERT INTO promotions SET ?", newPromotion, (err, res) => {
        
        if (err) {
            result(err, null);
            return;
        }
        result(null, newPromotion);
    });
};

const updateById = (promotion, id_promotion, result) => {
    
    sql.query(
        "UPDATE promotions SET name = ?, description = ?, url_image = ? WHERE id_promotion = ? ",
        [promotion.name,  promotion.description, promotion.url_image, id_promotion],  
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null);
                return;
            }
            
            result(null, { promociones: promotion });
        }
    );

}

const consultAllPromotion = (id_user, result) => {
    
    return new Promise((resolve, reject) => {

        sql.query(
            "SELECT * FROM promotions WHERE id_user = ?;", [id_user],
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


const deletePromotion = (id_promotion, id_user, result) => {

    sql.query(
        "DELETE FROM promotions WHERE id_promotion = ? AND id_user = ?", [id_promotion, id_user],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "Not found" }, null); 
                return;
            }
            result(null, { promocioneses: res });
        }
    );
}


module.exports = {
    create,
    updateById,
    consultAllPromotion,
    deletePromotion,
}