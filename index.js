const config = require('config');
const app = require('./app');
const port = process.env.PORT || 3030;
const mysql = require('mysql2');



const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');



    db = config
  
    async function startup() {
        try {
            await mysql.createPool(config.get('azure'));
            console.log('Conexion a azure Exitosa');
            await server()
            await initSerialPort();
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
    
    async function server() {
        var server = app.listen(port, () => {
            console.log(`Server Iniciado en Puerto:  ${port}`);
        });
    }
    // server()


    async function initSerialPort() {
        const port1 = new SerialPort({
            path: 'COM8', // Puerto COM donde está conectado el HC-05
            baudRate: 9600
        });
    
        // Usar el parser para manejar las líneas de datos recibidos
        const parser = port1.pipe(new ReadlineParser({ delimiter: '\n' }));
    
        // Escuchar los datos que llegan desde el Arduino
        parser.on('data', (data) => {
            console.log(`Datos recibidos: ${data}`);
            // Aquí puedes procesar e insertar los datos en la base de datos
            // enviarDatosAPI(data);
        });
    }


     startup();
