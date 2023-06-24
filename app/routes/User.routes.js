const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const router = Router();

const { create, update, consult, consultUserId, deleteUser, consultUserEmail} = require("../controllers/user.controller");
const { emailExists } = require('../helpers/db-validator');

// Crear un nuevo usuario
// url postman : http://localhost:3000/api/usuarios/registrar
// url consumo front : api/usuarios/registrar
router.post("/registrar",[
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('cellphone', 'El telefono es obligatorio').not().isEmpty(),
    check('creation_date', 'la fecha de creacion es obligatorio').not().isEmpty(),
    check('connection', 'la fecha de ultima conexion es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y mas de 8 caracteres').isLength({min:8}),
    validateFields
], create);

// actualizar un usuario
// url postman : http://localhost:3000/api/usuarios/actualizar/:id
// url consumo front : api/usuarios/actualizar/:id
router.put("/actualizar/:id_user", [
    check('email', 'El correo no es valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('cellphone', 'El telefono es obligatorio').not().isEmpty(),
    check('creation_date', 'la fecha de creacion es obligatorio').not().isEmpty(),
    check('connection', 'la fecha de ultima conexion es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y mas de 8 caracteres').isLength({min:8}),
    validateFields
], update);

// consultar todos los usuario
// url postman : http://localhost:3000/api/usuarios/consultarTodos
// url consumo front : api/usuarios/consultarTodos
router.get("/consultarTodos",  consult);

// consultar un por id usuario
// url postman : http://localhost:3000/api/usuarios/consultarPorId/:id_user
// url consumo front : api/usuarios/consultarPorId/:id_user
router.get("/consultarPorId/:id_user",[
    check('id_user', 'El id es obligatorio').not().isEmpty(),
    validateFields
], consultUserId);

// consultar un por id usuario
// url postman : http://localhost:3000/api/usuarios/consultarPorEmail/:email
// url consumo front : api/usuarios/consultarPorId/:id_user
router.get("/consultarPorEmail/:email", [
    check('email', 'El correo no es valido').isEmail(),
    validateFields
], consultUserEmail);


// eliminar un usuario por id 
// url postman : http://localhost:3000/api/usuarios/eliminar/:id_user
// url consumo front : api/usuarios/eliminar/:id_user
router.delete("/eliminar/:id_user", [
    check('id_user', 'El id es obligatorio').not().isEmpty(),
    validateFields
], deleteUser);



module.exports = router