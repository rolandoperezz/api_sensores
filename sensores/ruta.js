const { Router } = require("express")
var catalogo = require('./controller')


var api = Router()

api.get( '/obtener', catalogo.consAseguradora);


module.exports = api;