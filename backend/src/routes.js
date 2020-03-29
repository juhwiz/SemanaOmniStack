const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');


const routes = express.Router();

routes.post('/sessions', SessionController.create); // **** LOGIN **** 

routes.get('/ongs', OngController.index); // **** LISTAGEM ****   
routes.post('/ongs', OngController.create); // **** CADASTRO ****

routes.get('/profile', ProfileController.index); // **** LISTANDO CASOS SÓ DE UMA ONG ESPECIFICA ****

routes.get('/incidents', IncidentController.index); // **** LISTANDO CASOS ****
routes.post('/incidents', IncidentController.create); // **** CADASTRANDO CASOS ****
routes.delete('/incidents/:id', IncidentController.delete); // **** DELETANDO CASOS ****

module.exports = routes; //Para exportar variaveis de outros arquivos 