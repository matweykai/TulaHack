import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import { routesMap } from '@/router';

import Header from '@/components/header/Header.js';
import Cart from '@/components/cart/Cart' 

function CartPage(){
	// let { products } = useContext(storesContext); // подключение контекста
	// let { ... } = cart; // Распаковка методов
	
	return <>
        <Header></Header>
        <Cart></Cart>
	</>
}



export default observer(CartPage);