'use strict'
const express = require("express");
const app = express();
const bodyParser= require('body-parser');
const cors = require('cors');
var consulta = require('./sensores/ruta')


app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}))


app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin, X-Requested-With, Content-Type, Accept,access-control-allow-origin');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
    next();
});

app.use(consulta)

app.use(cors());

module.exports = app;
