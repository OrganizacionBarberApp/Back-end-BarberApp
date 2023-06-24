const { consultUserEmail } = require("../controllers/user.controller");


const emailExists = async(email = '') => {
    // Verificar si el correo existe
   
    const existsEmail = await consultUserEmail(email);
    console.log(existsEmail)
    if(existsEmail){
        throw new Error(`El correo ${email} ya está registrado`);
    }

}

module.exports = {
    emailExists
}