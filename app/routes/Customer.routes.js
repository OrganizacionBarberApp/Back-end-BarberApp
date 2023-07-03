//Importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Importaciones Barberapp
const customerController = require("../controllers/customer.controller");
const { validateFields } = require('../middlewares/validate-fields');
const validateCustomer = require('../middlewares/validate-customer');

// Crear un nuevo cliente
// url postman : http://localhost:3000/create
// url consumo front : /customer/create
router.post("/create",[
    
    check('email', 'The email is not valid').isEmail(),
    check('id_user', 'The id_user is not valid').not().isEmpty(),
    check('city', 'The city is not valid').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
    check('last_name', 'last name is required').not().isEmpty(),
    check('cellphone', 'The phone is required').not().isEmpty(),
    check('connection', 'the last connection date is required').not().isEmpty(),
    validateFields,
    
], customerController.create);

// actualizar un cliente
// url postman : http://localhost:3000/customer/update/:id
// url consumo front : customer/update/:id
router.put("/update/:id_customer", [
    check('email', 'The email is not valid').isEmail(),
    check('id_user', 'The id_user is not valid').not().isEmpty(),
    check('city', 'The city is not valid').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
    check('last_name', 'last name is required').not().isEmpty(),
    check('cellphone', 'The phone is required').not().isEmpty(),
    check('connection', 'the last connection date is required').not().isEmpty(),
    validateFields,
], customerController.update);

// consultar todos los cliente
// url postman : http://localhost:3000/customer/consultall
// url consumo front : /customer/consultall
router.get("/consultall",  customerController.consult);


// consultar un cliente por email o id
// url postman : http://localhost:3000/customer/:value
// url consumo front : customer/:value
router.get("/:value", [
    check('value', 'Query value is required').not().isEmpty(),
    check('value', 'Query value is required').notEmpty(),
    validateFields
], customerController.consultCustomerByEmailOrId);


// eliminar un cliente por id 
// url postman : http://localhost:3000/customer/delete/:id_customer
// url consumo front : customer/delete/:id_customer
router.delete("/delete/:id_customer", [
    check('id_customer', 'The id is required').not().isEmpty(),
    check('id_customer', 'The id is required').notEmpty().isNumeric(),
    validateFields
], customerController.deleteCustomer);


module.exports = router