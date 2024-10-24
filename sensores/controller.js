'use scritc'
require('module-alias/register')

const Maseguradora = require('./model');

async function consAseguradora(req, res) {
    try {
        await Maseguradora.ConsultaAseguradora(req.body).then(resp => {
            res.status(200).json(resp)
        })
    } catch (error) {
        console.error('Controller.Cat_aseguradora,cons_aseguradora : ', error)
        res.status(400).json({ 'estado': false, 'codigo': 206, 'descrip': 'Error en Consulta aseguradora' })
    }
}

module.exports = {  consAseguradora}
