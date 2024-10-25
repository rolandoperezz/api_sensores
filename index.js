const config = require('config');
const app = require('./app');
const port = process.env.PORT || 3030;
const mysql = require('mysql2');

    db = config
  
    async function startup() {
        try {
            await mysql.createPool(config.get('azure'));
            console.log('Conexion a azure Exitosa');
            await server()
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

    app.get('/', function(req, res) {
        res.json({ mensaje: '¡Hola Mundo!' })   
      })
     startup();
