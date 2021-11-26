import MainPage from '@/pages/MainPage'
import E404 from '@/pages/E404';

let routes = [
	{
		name: 'root',
		path: '/',
		component: MainPage
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