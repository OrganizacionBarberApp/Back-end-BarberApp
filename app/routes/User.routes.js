const { Router } = require('express');
const router = Router();

const { create, update, consult, consultUserId, deleteUser} = require("../controllers/user.controller");

// Crear un nuevo usuario
// url postman : http://localhost:3000/user/create
router.post("/create", create);

// actualizar un usuario
// url postman : http://localhost:3000/user/update/:id
// url consumo front : api/user/update/:id
router.put("/update/:id_user", update);

// consultar todos los usuario
// url postman : http://localhost:3000/user/consultall
// url consumo front : user/consultall
router.get("/consultall", consult);

// consultar un por id usuario
// url postman : http://localhost:3000/user/consultuser/:id_user
// url consumo front : user/consultuser/:id_user
router.get("/consultuser/:id_user", consultUserId);

// eliminar un usuario por id 
// url postman : http://localhost:3000/user/delete/:id_user
// url consumo front : user/delete/:id_user
router.delete("/delete/:id_user", deleteUser);



module.exports = router