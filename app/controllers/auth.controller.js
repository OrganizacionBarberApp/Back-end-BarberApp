const { response } = require("express");
const bcryptjs = require("bcryptjs");


const { consultUserByEmail } = require("../services/user.sevice");
const { generateJWT } = require("../helpers/generarJwt");



const login = async (req, res = response) => {

	try {
		const { email, password } = req.body;

		// check if user exists
		const user = await consultUserByEmail(email, 1);

		if (!user) {
		return res.status(404).json({ mensaje: `User ${email} is not registered` });
		}

		//check if the password is correct
		const validPassword = bcryptjs.compareSync( password, user.password);
		if ( !validPassword ){

			return res.status(400).json({
				msg : "incorrect credentials"
			})
		}
		
		//Generate token
		const token = await generateJWT( user.id_user );
		res.json({ user, token});

	} catch (error) {
		console.error(error);
		return res.status(500).json({ mensaje: 'Error al obtener el usuario' });
	}

}


module.exports = login;