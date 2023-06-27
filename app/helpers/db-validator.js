const serviceUser = require("../controllers/user.controller");


const emailExists = async(email = '') => {
    // Verificar si el correo existe

    const existsEmail = await serviceUser.consultUserByEmailOrId(email);
    console.log(existsEmail)
    if(existsEmail){
        throw new Error(`El correo ${email} ya está registrado`);
    }

}

module.exports = {
    emailExists
}