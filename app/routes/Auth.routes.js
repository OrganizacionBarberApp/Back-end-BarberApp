//Importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');

//Importaciones Barberapp
const authController = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.post('/login', [
    check('email', "The email is required").isEmail(),
    check('password', "The password is required").not().isEmpty(),
    validateFields
], authController.login );

module.exports = router;