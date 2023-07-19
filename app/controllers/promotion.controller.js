const Promotion = require('../models/Promotion');
const promotionService = require('../services/promotion.service');


const create = async (req, res) => {

    let body = req.body;

    // Validar solicitud
    if (!body) {
        return res.status(400).send({
            mensaje: "Content cannot be empty"
        });
    }

    // Crear un nuevo promociones
    const promotion = new Promotion({
        name: body.name,
        id_user: body.id_user,
        description: body.description,
        url_image: body.url_image,
        role: body.role,
        promotion_date: new Date(),
    });

    // Guardar promociones en la bd
    await promotionService.create(promotion, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Email must be unique",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                promociones: promotion,
            });
        }
    });
};

const update = async (req, res) => {

    let body = req.body;
    const id_promotion = req.params.id_promotion;

    const promotion = new Promotion({
        name: body.name,
        description: body.description,
        url_image: body.url_image,
        role: body.role,
    });

    if (!req.body) {
        res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await promotionService.updateById(promotion, id_promotion, (err, promotion) => {
        if (err) {
            if (err) {

                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is already a promotion with that email' },
                    err: err
                });
            }
        }

        res.status(200).json({
            ok: true,
            promociones: promotion
        });

    });
};

const consult = async (req, res) => {
    let id = parseInt(req.params.id_user);

    await promotionService.consultAllPromotion(id, (err, promotion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error loading promotions',
                errors: err
            });
        } else {

            res.status(200).json({
                ok: true,
                promocioneses: promotion
            });
        }
    })
}

const deletePromotion = async (req, res) => {

    const id_promotion = parseInt(req.params.id_promotion);
    const id_user = parseInt(req.body.id_user);

    if (!id_promotion || !id_user) {
        return res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await promotionService.deletePromotion(id_promotion, id_user, (err, promotion) => {
        if (err) {
            if (err) {
                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is no promotion with that email' }
                });
            }
        }

        res.status(200).json({
            ok: true,
            promociones: "promotion deleted successfully"
        });

    });

}

module.exports = {
    create,
    update,
    consult,
    deletePromotion
}
