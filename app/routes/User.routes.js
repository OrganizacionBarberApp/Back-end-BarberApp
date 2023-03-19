const { Router } = require('express');
const router = Router();

const { create, update, consult, consultUserId, deleteUser} = require("../controllers/user.controller");

// Crear un nuevo usuario
// url postman : http://localhost:3000/api/usuarios/registrar
router.post("/registrar", create);

// actualizar un usuario
// url postman : http://localhost:3000/api/usuarios/actualizar/:id
// url consumo front : api/usuarios/actualizar/:id
router.put("/actualizar/:id_user", update);

// consultar todos los usuario
// url postman : http://localhost:3000/api/usuarios/consultarTodos
// url consumo front : api/usuarios/consultarTodos
router.get("/consultarTodos", consult);

// consultar un por id usuario
// url postman : http://localhost:3000/api/usuarios/consultarPorId/:id_user
// url consumo front : api/usuarios/consultarPorId/:id_user
router.get("/consultarPorId/:id_user", consultUserId);

// eliminar un usuario por id 
// url postman : http://localhost:3000/api/usuarios/eliminar/:id_user
// url consumo front : api/usuarios/eliminar/:id_user
router.delete("/eliminar/:id_user", deleteUser);



module.exports = router