//Importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Importaciones Barberapp
const userController = require("../controllers/user.controller");
const { emailExists } = require('../helpers/db-validator');
const { validateFields } = require('../middlewares/validate-fields');

// Crear un nuevo usuario
// url postman : http://localhost:3000/create
// url consumo front : /user/create
router.post("/create",[
    
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('cellphone', 'El telefono es obligatorio').not().isEmpty(),
    check('creation_date', 'la fecha de creacion es obligatorio').not().isEmpty(),
    check('connection', 'la fecha de ultima conexion es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y mas de 8 caracteres').isLength({min:8}),
    validateFields,
    
], userController.create);

// actualizar un usuario
// url postman : http://localhost:3000/user/update/:id
// url consumo front : user/update/:id
router.put("/update/:id_user", [
    check('email', 'El correo no es valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('cellphone', 'El telefono es obligatorio').not().isEmpty(),
    check('creation_date', 'la fecha de creacion es obligatorio').not().isEmpty(),
    check('connection', 'la fecha de ultima conexion es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y mas de 8 caracteres').isLength({min:8}),
    validateFields
], userController.update);

// consultar todos los usuario
// url postman : http://localhost:3000/user/consultall
// url consumo front : /user/consultall
router.get("/consultall",  userController.consult);


// consultar un usuario por email 
// url postman : http://localhost:3000/user/consultUserByEmail/:email
// url consumo front : user/consultUserByEmail/:email
router.get("/:value", [
    check('value', 'Query value is required').not().isEmpty(),
    validateFields
], userController.consultUserByEmailOrId);


// eliminar un usuario por id 
// url postman : http://localhost:3000/user/delete/:id_user
// url consumo front : user/delete/:id_user
router.delete("/delete/:id_user", [
    check('id_user', 'El id es obligatorio').not().isEmpty(),
    validateFields
], userController.deleteUser);


module.exports = router