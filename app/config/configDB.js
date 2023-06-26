require('dotenv').config();

module.exports = {
    HOST: process.env.ENV_HOST,
    USER: process.env.ENV_USER,
    PASSWORD: process.env.ENV_PASSWORD,
    DB: process.env.ENV_DB,
    PORT: process.env.ENV_PORT
};