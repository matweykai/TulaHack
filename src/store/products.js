import { makeObservable, action, observable, runInAction } from 'mobx';

/*
	for big data
	[{}, {}] => {pk: {}, pk1: {}} 
*/

const productFromServer = [
	{
		id: 100,
		title: 'Ipnone 200',
		price: 12000,
		rest: 10
	},
	{
		id: 101,
		title: 'Samsung AAZ8',
		price: 22000,
		rest: 5
	},
	{
		id: 103,
		title: 'Nokia 3310',
		price: 5000,
		rest: 2
	},
	{
		id: 105,
		title: 'Huawei ZZ',
		price: 15000,
		rest: 8
	}
];

class ProductsStore{
	products = productFromServer;

	getById = id => this.products.find(pr => pr.id === id);
	// get getById = () => id => this.products.find(pr => pr.id === id) // hard real mode

	async load(){
		let response = await fetch('http://faceprog.ru/reactcourseapi/products/all.php');
		let products = await response.json();
		runInAction(() => { this.products = products });
	}

	constructor(){
		makeObservable(this, {
			products: observable,
			load: action
		});
	}
}

export default new ProductsStore();

/*
	async load(){
		let response = await fetch('http://faceprog.ru/reactcourseapi/products/all.php');
		let products = await response.json();
		this.products = products;
	}
*/

/*
	load(){
		fetch('http://faceprog.ru/reactcourseapi/products/all.php')
			.then(r => r.json())
			.then(products => runInAction(() => {
				this.products = products;
			}))
			.catch(e => {
				
			});
	}

*/