const ServiceUser = require("../services/user.sevice")

const consultUserEmail = async (req, res) => {

    let email;

    if (req.params) {
        email = req.params.email;
    } else {
        email = req;
    }

    await ServiceUser.consultUserByEmail(email, 1, (err, user) => {

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

module.exports = {
    consultUserEmail,
}