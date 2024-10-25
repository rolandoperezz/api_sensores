'use scritc'


const modelo = require('./model');

async function consSensores(req, res) {
    try {
        await modelo.ConsultaSensores().then(resp => {
            res.status(200).json(resp)
        })
    } catch (error) {
        console.error('Controller.sensores : ', error)
        res.status(400).json({ 'estado': false, 'codigo': 206, 'descrip': 'Error en sensores' })
    }
}

async function insSensores(req, res) {
    try {
        await modelo.InsertarSensor(req.body).then(resp => {
            res.status(200).json(resp)
        })
    } catch (error) {
        console.error('Controller.insertar : ', error)
        res.status(400).json({ 'estado': false, 'codigo': 206, 'descrip': 'Error en insertar' })
    }
}


module.exports = {  consSensores,insSensores}
