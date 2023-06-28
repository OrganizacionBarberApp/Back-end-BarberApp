//Importaciones de terceros
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

//Importaciones Barberapp
const barbershopController = require("../controllers/barbershop.controller");
const { validateFields } = require('../middlewares/validate-fields');
const validatebarbershop = require('../middlewares/validate-barbershop');

// Crear un nuevo usuario
// url postman : http://localhost:3000/create
// url consumo front : /barbershop/create
router.post("/create",[
], barbershopController.create);

// actualizar un usuario
// url postman : http://localhost:3000/barbershop/update/:id
// url consumo front : barbershop/update/:id
router.put("/update/:id_barbershop", [
], barbershopController.update);

// consultar todos los usuario
// url postman : http://localhost:3000/barbershop/consultall
// url consumo front : /barbershop/consultall
router.get("/consultall",  barbershopController.consult);


// consultar un usuario por email o id
// url postman : http://localhost:3000/barbershop/consultbarbershopByEmail/:email
// url consumo front : barbershop/consultbarbershopByEmail/:email
router.get("/:value", [
], barbershopController.consultBarbershopByEmailOrId);


// eliminar un usuario por id 
// url postman : http://localhost:3000/barbershop/delete/:id_barbershop
// url consumo front : barbershop/delete/:id_barbershop
router.delete("/delete/:id_barbershop", [
], barbershopController.deleteBarbershop);


module.exports = router