//Importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Importaciones Barberapp
const promotionController = require("../controllers/promotion.controller");
const { validateFields } = require('../middlewares/validate-fields');

// Crear un nuevo publicaciones
// url postman : http://localhost:3000/create
// url consumo front : /promotion/create
router.post("/create",[
    
    check('name', 'name is required').not().isEmpty(),
    check('id_user', 'The id is required').not().isEmpty(),
    check('description', 'last name is required').not().isEmpty(),
    check('role', 'The phone is required').not().isEmpty(),
    validateFields,
    
], promotionController.create);

// actualizar un publicaciones
// url postman : http://localhost:3000/promotion/update/:id
// url consumo front : promotion/update/:id
router.put("/update/:id_promotion", [

    check('name', 'name is required').not().isEmpty(),
    check('description', 'last name is required').not().isEmpty(),
    check('role', 'The phone is required').not().isEmpty(),
    validateFields

], promotionController.update);

// consultar todos los publicaciones
// url postman : http://localhost:3000/promotion/consultall
// url consumo front : /promotion/consultall
router.get("/consultall/:id_user", [
    check('id_user', 'The id is required').not().isEmpty(),
    validateFields
],  promotionController.consult);


// eliminar un publicaciones por id 
// url postman : http://localhost:3000/promotion/delete/:id_promotion
// url consumo front : promotion/delete/:id_promotion
router.delete("/delete/:id_promotion", [
    check('id_promotion', 'The id is required').not().isEmpty(),
    check('id_promotion', 'The id is required').notEmpty().isNumeric(),
    validateFields
], promotionController.deletePromotion);


module.exports = router