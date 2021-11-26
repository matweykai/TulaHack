import React from 'react';
import ReactDom from 'react-dom';

import App from './App.js';
import storesContext from './contexts/store'; // Подключение контекста

import productsStore from './store/products'; // Подключение стора

// список подключаемых сторов
let stores = {
	products: productsStore,
};

// Подтягивание данных с сервера
// stores.products.load(); 

ReactDom.render(
	<storesContext.Provider value={stores}>
		<App/>
	</storesContext.Provider>,
	document.querySelector('.app'),
);
