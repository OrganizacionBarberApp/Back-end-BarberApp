const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        // Path de rutas de la appi
        this.authPath = '/auth';
        this.userPath = '/user';
        this.barbershopPath = '/barbershop';
        this.customerPath = '/customer';

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
        this.app.use( this.authPath, require('../routes/Auth.routes'));
        this.app.use( this.userPath, require('../routes/User.routes')); 
        this.app.use( this.barbershopPath, require('../routes/Barbershop.routes'));
        this.app.use( this.customerPath, require('../routes/Customer.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }

}

module.exports = Server;