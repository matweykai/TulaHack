import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import { routesMap } from '@/router';

import Header from '@/components/header/Header.js';
import Form from '@/components/form/Form';

function AutorizationPage(){
	// let { products } = useContext(storesContext); // подключение контекста
	// let { ... } = cart; // Распаковка методов
	
	return <>
		<Header></Header>
		<main>
            <Form text="Вход" btn_text="Войти" reg={false}></Form>
		</main>
	</>
}



export default observer(AutorizationPage);