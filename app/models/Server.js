const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        // Path de rutas de la appi
        this.userPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    // rutas 
    routes() {
        this.app.use( this.userPath, require('../routes/User.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;