import React from 'react';
import ReactDom from 'react-dom';

import App from './App.js';
import storesContext from './contexts/store'; // Подключение контекста

import productsStore from './store/products'; // Подключение стора
import cartStore from './store/cart';
import userStore from './store/user';

// список подключаемых сторов
let stores = {
	products: productsStore,
	cart: cartStore,
	user: userStore
};

// Подтягивание данных с сервера
stores.products.load();
stores.cart.load();

ReactDom.render(
	<storesContext.Provider value={stores}>
		<App/>
	</storesContext.Provider>,
	document.querySelector('.app'),
);
