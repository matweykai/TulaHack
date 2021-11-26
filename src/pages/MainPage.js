import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import { routesMap } from '@/router';

function MainPage(){
	// let { products } = useContext(storesContext); // подключение контекста
	// let { ... } = cart; // Распаковка методов
	
	return <>
		<Header>
			<Logo></Logo>
			<Search></Search>
			<Login></Login>
			<Cart></Cart>
		</Header>

		<CategoryMenu></CategoryMenu>

		<Store></Store>
		

		<h1>Index</h1>
		<Link to={routesMap.root} className="">Next step</Link>
	</>
}

export default observer(MainPage);