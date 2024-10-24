const mysql = require('mysql2/promise');
const config = require('config');



async function ConsultaAseguradora(array) {
    const connection = await mysql.createConnection(config.get('mariaDB'));  
    let estados = null
  
    if (array.estado === 0) {
      estados = ' is not null'
  } else if (array.estado === 'A') {
      estados = ` = 'A'`
  } else if (array.estado === 'I') {
      estados = ` = 'I'`
  }
  
   queriFinal =  `SELECT id_aseguradora,razon_social,nombre_comercial,direccion, nit, telefono, correo_electronico, nombre_contacto, telefono_contacto,observaciones, estado FROM AJS_ASEGURADORA where estado `+ estados + ` order by nombre_comercial ASC `;
    try {
      const [rows, fields] = await connection.execute(
       queriFinal
      );
      console.log(rows)
      if (rows != undefined) {
        return(rows); // Corregido aquí
      } else {
        return { 'estado': false, 'codigo': 209, 'descrip': 'No hay Informacion' }; // Corregido aquí
      }
    } catch (error) {
      console.log(error)
      return { 'estado': false, 'codigo': 209, 'descrip': 'consulta aseguradora', error }; // Corregido aquí
    } finally {
      if (connection) {
        connection.end(); // O connection.release() si estás usando pool de conexiones
      }
    }
  }


  module.exports = {
   ConsultaAseguradora
}