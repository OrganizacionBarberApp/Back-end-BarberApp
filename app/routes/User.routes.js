//Importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Importaciones Barberapp
const userController = require("../controllers/user.controller");
const { validateFields } = require('../middlewares/validate-fields');
const validateUser = require('../middlewares/validate-user');

// Crear un nuevo usuario
// url postman : http://localhost:3000/create
// url consumo front : /user/create
router.post("/create",[
    
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(validateUser.consultUserEmail),
    check('name', 'name is required').not().isEmpty(),
    check('last_name', 'last name is required').not().isEmpty(),
    check('cellphone', 'The phone is required').not().isEmpty(),
    check('creation_date', 'the creation date is required').not().isEmpty(),
    check('connection', 'the last connection date is required').not().isEmpty(),
    check('password', 'The password is mandatory and more than 8 characters').isLength({min:8}),
    validateFields,
    
], userController.create);

// actualizar un usuario
// url postman : http://localhost:3000/user/update/:id
// url consumo front : user/update/:id
router.put("/update/:id_user", [
    check('email', 'The email is not valid').isEmail(),
    check('name', 'name is required').not().isEmpty(),
    check('last_name', 'last name is required').not().isEmpty(),
    check('cellphone', 'The phone is required').not().isEmpty(),
    check('creation_date', 'the creation date is required').not().isEmpty(),
    check('connection', 'the last connection date is required').not().isEmpty(),
    check('password', 'The password is mandatory and more than 8 characters').isLength({min:8}),
    check('id_user', 'The id is required').notEmpty().isNumeric(),
    validateFields
], userController.update);

// consultar todos los usuario
// url postman : http://localhost:3000/user/consultall
// url consumo front : /user/consultall
router.get("/consultall",  userController.consult);


// consultar un usuario por email o id
// url postman : http://localhost:3000/user/:value
// url consumo front : user/:value
router.get("/:value", [
    check('value', 'Query value is required').not().isEmpty(),
    check('value', 'Query value is required').notEmpty().isNumeric(),
    validateFields
], userController.consultUserByEmailOrId);


// eliminar un usuario por id 
// url postman : http://localhost:3000/user/delete/:id_user
// url consumo front : user/delete/:id_user
router.delete("/delete/:id_user", [
    check('id_user', 'The id is required').not().isEmpty(),
    check('id_user', 'The id is required').notEmpty().isNumeric(),
    validateFields
], userController.deleteUser);


module.exports = router