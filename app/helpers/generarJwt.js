const jwt = require('jsonwebtoken');


const   generateJWT = ( uid = '') => {

    return new Promise( (resolve, reject)  => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '60d'
        }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject('Could not generate package (Token) ');
            } else {
                resolve( token );
            }

        });

    })

}

module.exports = {

    generateJWT
}