const express = require('express');
const cors = require('cors');
const routes = require('./routes'); //Comando para requisitar alguma variavel de outra página

const app = express();

app.use(cors());
app.use(express.json());// Faz com que ele entenda que as requisições viram em json
app.use(routes);


/* Rota é o caminho todo da barra
   Recurso é a ultima parte depois da '/'
*/
/*
app.post('/users', (request,response) => {

    //return response.send('Hello World');
    return response.json({
        evento: 'FIESTA WIN SOTY & AOTY',
        pessoas:'WIZONES and IZONE/meus amores'
    });
});
*/


app.listen(3333);
