const { Router } = require("express")
var catalogo = require('./controller')


var api = Router()

api.get( '/obtener', catalogo.consSensores);
api.post( '/insertar', catalogo.insSensores);


module.exports = api;