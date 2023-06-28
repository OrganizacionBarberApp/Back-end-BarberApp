const Barbershop = require('../models/Barbershop');
const barbershopService = require('../services/barbershop.service');



const create = async (req, res) => {

    let body = req.body;

    // Validar solicitud
    if (!body) {
        return res.status(400).send({
            mensaje: "Content cannot be empty"
        });
    }
    
    // Crear un nuevo usuario
    const barbershop = new Barbershop({
        id_barbershop : body.id_barbershop,
        id_user : body.id_user,
        name : body.name,
        cellphone : body.cellphone,
        descrition : body.descrition,
        location : body.location,
        url_image : body.url_image,
        qualification : body.qualification,
        current : body.current,
        creation_date : body.creation_date,
        connection : body.connection
    });
    
    // Guardar usuario en la bd
    await barbershopService.create(barbershop, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Email must be unique",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                usuario: barbershop,
            });
        }
    });
};

const update = async (req, res) => {

    let body = req.body;
    const id_barbershop = req.params.id_barbershop;
    
    const barbershop = new Barbershop({
        id_barbershop : body.id_barbershop,
        id_barbershop : body.id_barbershop,
        name : body.name,
        cellphone : body.cellphone,
        descrition : body.descrition,
        location : body.location,
        url_image : body.url_image,
        qualification : body.qualification,
        current : body.current,
        creation_date : body.creation_date,
        connection : body.connection
    });

    if (!req.body) {
        res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await barbershopService.updateById(barbershop, id_barbershop, (err, barbershop) => {
        if (err) {
            if (err) {

                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is already a barbershop with that email' },
                    err: err
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: barbershop
        });

    });
};

const consult = async (req, res) => {

    await barbershopService.consultAllBarbershop((err, barbershop) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error loading barbershops',
                errors: err
            });
        } else {

            res.status(200).json({
                ok: true,
                usuarios: barbershop
            });
        }
    })
}

const consultBarbershopByEmailOrId = async (req, res) => {

    let value = req.params.value;

    if (!isNaN(parseInt(value))) {

        const barbershop = await barbershopService.consultBarbershopId(value, 1);

        if (barbershop) {
            return res.status(200).json(barbershop);
        }
        return res.status(404).json({ msg: 'No barbershop found with that id' });

    } else {

        const barbershop = await barbershopService.consultbarbershopByEmail(value, 1);

        if (barbershop) {
            return res.status(200).json(barbershop);
        }
        return res.status(404).json({ msg: 'No barbershop found with that email' });

    }

}

const deleteBarbershop = async (req, res) => {

    const id_barbershop = req.params.id_barbershop;

    if (!id_barbershop) {
        res.status(400).send({
            mensaje: "It cant be empty!"
        });
    }

    await barbershopService.deleteBarbershop(id_barbershop, (err, barbershop) => {
        if (err) {
            if (err) {
                return res.status(400).send({
                    ok: false,
                    errors: { message: 'There is no barbershop with that email' }
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: "barbershop deleted successfully"
        });

    });

}

module.exports = {
    create,
    update,
    consult,
    deleteBarbershop,
    consultBarbershopByEmailOrId
}
