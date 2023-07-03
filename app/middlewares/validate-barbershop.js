const ServiceUser = require("../services/user.sevice")

const consultUserEmail = async (req, res) => {

    await ServiceUser.consultUserByEmail(email, 1, (err, user) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'No user found with that email',
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
    
}