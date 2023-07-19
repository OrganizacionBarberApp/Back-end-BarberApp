//Importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Importaciones Barberapp
const publicationController = require("../controllers/publication.controller");
const { validateFields } = require('../middlewares/validate-fields');

// Crear un nuevo publicaciones
// url postman : http://localhost:3000/create
// url consumo front : /publication/create
router.post("/create",[
    
    check('name', 'name is required').not().isEmpty(),
    check('id_user', 'The id is required').not().isEmpty(),
    check('description', 'last name is required').not().isEmpty(),
    check('role', 'The phone is required').not().isEmpty(),
    validateFields,
    
], publicationController.create);

// actualizar un publicaciones
// url postman : http://localhost:3000/publication/update/:id
// url consumo front : publication/update/:id
router.put("/update/:id_publication", [

    check('name', 'name is required').not().isEmpty(),
    check('description', 'last name is required').not().isEmpty(),
    check('role', 'The phone is required').not().isEmpty(),
    validateFields

], publicationController.update);

// consultar todos los publicaciones
// url postman : http://localhost:3000/publication/consultall
// url consumo front : /publication/consultall
router.get("/consultall/:id_user", [
    check('id_user', 'The id is required').not().isEmpty(),
    validateFields
],  publicationController.consult);


// eliminar un publicaciones por id 
// url postman : http://localhost:3000/publication/delete/:id_publication
// url consumo front : publication/delete/:id_publication
router.delete("/delete/:id_publication", [
    check('id_publication', 'The id is required').not().isEmpty(),
    check('id_publication', 'The id is required').notEmpty().isNumeric(),
    validateFields
], publicationController.deletePublication);


module.exports = router