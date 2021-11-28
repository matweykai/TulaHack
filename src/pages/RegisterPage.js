import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import { routesMap } from '@/router';

import Header from '@/components/header/Header.js';
import Form from '@/components/form/Form.js';

function RegisterPage(){

	
	return <>
		<Header></Header>
		<main>
			<Form
			text="Регистрация"
			btn_text="Зарегистрироваться"
			reg={true}
			></Form>
		</main>
	</>
}



export default observer(RegisterPage);