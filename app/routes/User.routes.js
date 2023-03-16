module.exports = app => {
    const user = require("../controllers/usuario.controller");

    // Crear un nuevo usuario
    app.post("/registrar", user.create);

    // actualizar un usuario
    app.put("/actualizar", user.update);

    // consultar todos los usuario
    app.get("/consultarTodos", user.consult);

    // consultar un por id usuario
    app.get("/consultarPorId/:userId", user.consultUserId);

    // eliminar un por id usuario
    app.delete("/eliminar/:userId", user.delete);

};