const mysql = require("mysql");
const dbConfig = require("../config/configDB");
const { promisify } = require("util");
// Crear una conexión a la base de datos

const conexion = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port:dbConfig.PORT
});

conexion.getConnection((err, connection) => {
  if (err){
    if (err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error("ERRO CONNECITON DB");
    }
    if (err.code === 'ER_CON_COUNT_ERROR'){
      console.error("MANY CONNECTIONS");
    }
    if (err.code === 'ECONREFUSED'){
      console.error("DATABASE CONECTION ERROR");
    }
  }
  
  if (connection) {connection.release();
    console.log("DB IS CONECT")
  }else{
    console.log(err)
  }
  return;
});

conexion.query = promisify(conexion.query);

module.exports = conexion;