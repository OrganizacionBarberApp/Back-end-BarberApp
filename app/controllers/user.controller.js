const User = require('../models/User');
const ServiceUser = require('../services/user.sevice');
const bcrypt = require("bcryptjs");



const create = async (req, res) => {
    console.log("es eso");
    var body = req.body;
    const salt = bcrypt.genSaltSync();

    // Validar solicitud
    if (!body) {
        return res.status(400).send({
            mensaje: "El contenido no puede estar vacio"
        });
    }

    // Crear un nuevo usuario
    const user = new User({
        name: body.name,
        last_name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        url_image: body.url_image,
        google: body.google,
        cellphone: body.cellphone,
        current: body.current,
        creation_date: body.creation_date,
        connection: body.connection,
        location: body.location
    });

    // Guardar usuario en la bd
    await ServiceUser.create(user, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "El correo debe ser único",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                usuario: user,
            });
        }
    });
};

const update = async (req, res) => {

    let body = req.body;
    const id_user = req.params.id_user;
    const salt = bcrypt.genSaltSync()

    const user = new User({
        name: body.name,
        last_name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        url_image: body.url_image,
        google: body.google,
        cellphone: body.cellphone,
        current: body.current,
        creation_date: body.creation_date,
        connection: body.connection,
        conexion: new Date()
    });

    if (!req.body) {
        res.status(400).send({
            mensaje: "No puede estar vacio!"
        });
    }

    await ServiceUser.updateById(user, id_user, (err, user) => {
        if (err) {
            if (err) {
                console.log(err)

                return res.status(400).send({
                    ok: false,
                    errors: { message: 'Ya existe un usuario con ese correo' },
                    err: err
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: user
        });

    });
};

const consult = async (req, res) => {

    await ServiceUser.consultAllUser((err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los usuarios',
                errors: err
            });
        } else {

            res.status(200).json({
                ok: true,
                usuarios: user
            });
        }
    })
}

const consultUserId = async (req, res) => {

    const id_user = req.params.id_user;

    await ServiceUser.consultUserId(id_user, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando los usuarios',
                errors: err
            });
        } else {

            res.status(200).json({
                ok: true,
                usuarios: user
            });
        }
    })

}

const consultUserEmail = async (req, res) => {

    let email;

    if (req.params) {
        email = req.params.email;
    } else {
        email = req;
    }

    await ServiceUser.consultUserByEmail(email, (err, user) => {
        
        if (err) {
           
            return res.status(500).json({
                ok: false,
                mensaje: 'No se encontro ningún usuario con ese correo',
                errors: err
            });
        }       
        
        res.status(200).json({
            ok: true,
            usuario: user
        });

    })

}

const deleteUser = async (req, res) => {

    const id_user = req.params.id_user;

    if (!id_user) {
        res.status(400).send({
            mensaje: "No puede estar vacio!"
        });
    }

    await ServiceUser.deleteUser(id_user, (err, user) => {
        if (err) {
            if (err) {
                return res.status(400).send({
                    ok: false,
                    errors: { message: 'No existe un usuario con ese correo' }
                });
            }
        }

        res.status(200).json({
            ok: true,
            usuario: "Usuario eliminado con éxito "
        });

    });

}

module.exports = {
    create,
    update,
    consult,
    consultUserId,
    deleteUser,
    consultUserEmail
}
