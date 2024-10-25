const config = require('config');



const mysql = require('mysql2/promise');

async function ConsultaSensores() {
    // Agregar un tiempo de espera de conexión
    const connectionConfig = { ...config.get('azure'), connectTimeout: 10000 }; // 10 segundos

    let connection;
    try {
        // Crear la conexión
        connection = await mysql.createConnection(connectionConfig);
        
        // Consulta SQL
        const queriFinal = `SELECT * FROM mediciones`;

        // Ejecutar la consulta
        const [rows] = await connection.execute(queriFinal);

        // Comprobar si hay resultados
        if (rows.length > 0) {
            return rows;
        } else {
            return { estado: false, codigo: 209, descrip: 'No hay Información' };
        }
    } catch (error) {
        console.log('Error en ConsultaSensores:', error);
        return { estado: false, codigo: 209, descrip: 'consulta sensores', error };
    } finally {
        // Cerrar la conexión
        if (connection) {
            await connection.end();
        }
    }
}


// Función para insertar una nueva medición en la tabla
async function InsertarSensor(array) {
  const connectionConfig = { ...config.get('azure'), connectTimeout: 10000 };

  let connection;
  try {
      connection = await mysql.createConnection(connectionConfig);
      
      const insertQuery = `INSERT INTO mediciones ( sensor, datos) VALUES ( 
                                          '${array.sensor}', 
                                          '${array.datos}')`;

      const [rows, fields] = await connection.execute(
        insertQuery
    );

    if (rows.affectedRows === 1) {
      return { 'estado': true, 'descrip': 'Insert creado' }; // Corregido aquí
    } else {
      return { 'estado': false, 'codigo': 209, 'descrip': 'No se inserto' }; // Corregido aquí
    }
  } catch (error) {
      console.log('Error en InsertarSensor:', error);
      return { estado: false, codigo: 209, descrip: 'Error al insertar medición', error };
  } finally {
      if (connection) {
          await connection.end();
      }
  }
}


  module.exports = {
    ConsultaSensores,InsertarSensor
}