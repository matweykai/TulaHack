import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import { routesMap } from '@/router';

import Header from '@/components/header/Header.js';
import CategoryMenu from '@/components/categoryMenu/CategoryMenu.js';
import Store from '@/components/store/Store.js';

function CategoryPage(){	
	return <>

		<Header></Header>
		<main style={{ display: 'flex', overflow: 'hidden' }}>
			<CategoryMenu></CategoryMenu>
			<Store type="category"></Store>
		</main>
	</>
}



export default observer(CategoryPage);