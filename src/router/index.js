import MainPage from '@/pages/MainPage'
import CartPage from '@/pages/CartPage'
import AutorizationPage from '@/pages/AutorizationPage'
import RegisterPage from '@/pages/RegisterPage'
import E404 from '@/pages/E404';

let routes = [
	{
		name: 'root',
		path: '/',
		component: MainPage
	},
	{
		name: 'cart',
		path: '/cart',
		component: CartPage
	},
	{
		name: 'auto',
		path: '/login',
		component: AutorizationPage
	},
	{
		name: 'reg',
		path: '/regin',
		component: RegisterPage
	},
	{
		path: '**',
		component: E404
	}
];

let routesMap = {};

routes.forEach(route => {
	if(route.hasOwnProperty('name')){
		routesMap[route.name] = route.path;
	}
})

export { routes, routesMap }