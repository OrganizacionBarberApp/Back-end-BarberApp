require('dotenv').config();

// const conexion = require("./app/models/db");
const express = require("express");


const app = express();


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


require("./app/routes/User.routes")(app);


app.listen(process.env.PORT, () => {
    conexion;
    console.log("El servidor se esta ejecutando en el puerto", process.env.PORT);
});
