const User = require('../models/User');
const serviceUser = require('../services/user.sevice');
const bcrypt = require("bcryptjs");


exports.create = (req, res) => {

    var body = req.body;

    // Validar solicitud
    if (!body) {
        return res.status(400).send({
            mensaje: "El contenido no puede estar vacio"
        });
    }


    // Crear un nuevo usuario
    const User = new Usuario({
        name: body.name,
        last_name: body.name,
        email: body.email,
        password:   bcrypt.hashSync(body.password, 10),
        url_image: body.url_image,
        google: body.google,
        cellphone:  body.cellphone,
        current: body.current,
        creation_date: body.creation_date,
        connection: body.connection,
        conexion: new Date()
    });


    // Guardar usuario en la base de datos
    serviceUser.create(usuario, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "El correo debe ser único",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                usuario: usuario,
                usuariotoke: req.usuario
            });
        }
    });
};
