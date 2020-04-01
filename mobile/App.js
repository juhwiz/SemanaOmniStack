import 'intl';  // Importando a internacionalização da biblioteca
import 'intl/locale-data/jsonp/pt-BR'; // pegando o pt brasileiro

import React from 'react';
import Routes from './src/routes';

export default function App() {
  return (
    <Routes />
  );
}
