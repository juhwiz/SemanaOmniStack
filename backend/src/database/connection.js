const knex = require('knex');
const configuration = require('../../knexfile'); // os '..' servem para voltar uma pasta.

const connection = knex(configuration.development); // o 'development' é uma das partes do knexfile

module.exports = connection;