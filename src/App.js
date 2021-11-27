import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { routes, routesMap } from './router';
import { observer } from 'mobx-react-lite';
import storesContext from '@/contexts/store';

function App(){
	let routesComponents = routes.map(route => (
		<Route path={route.path} component={route.component} exact={route.exact ?? true} key={route.path} />
	)); 
	// let { products } = useContext(storesContext);

	return <Router>
	
		<Switch>
			{ routesComponents }
		</Switch>

	</Router>
}

export default observer(App);