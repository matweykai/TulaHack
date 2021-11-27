import { makeObservable, action, observable, runInAction, computed } from 'mobx';

/*
	for big data
	[{}, {}] => {pk: {}, pk1: {}} 
*/

let TEST_DATA = [
	{
		id: 1,
		cnt: 1,
		price: 200,
		name: "banana",
		img: "../public/img/tomato.jpg",
		desc: "Вкусные и питательные, африканские бананы"
	},
	{
		id: 2,
		cnt: 1,
		price: 300,
		name: "Томаты",
		img: "../public/img/tomato.jpg",
		desc: "Вкусные и питательные, африканские бананы"
	},
	{
		id: 3,
		cnt: 1,
		price: 800,
		name: "Курица",
		img: "../public/img/tomato.jpg",
		desc: "Вкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананы"
	},
	{
		id: 4,
		cnt: 1,
		price: 120,
		name: "Курица",
		img: "../public/img/tomato.jpg",
		desc: "Вкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананы"
	},

];

class CartStore{
	products = TEST_DATA;
	#token = null;
	
	get productsDetailed(){
		return this.products.map(pr => {
			let info = productsStore.getById(pr.id);
			return { ...info, ...pr };
		})
	}

	get total(){
		return this.productsDetailed.reduce((acc, pr) => acc + pr.price * pr.cnt, 0);
	}


	// тру тотал 
	get total(){
		return this.products.reduce((acc, pr) => acc + pr.price * pr.cnt, 0);
	}

	inCart = (id) => this.products.some(pr => pr.id === id);
	
	async add(id){
		if(!this.inCart(id)){
			let res = await fetch(TMP_BASE_URL + `add.php?token=${this.#token}&id=${id}`).then(r => r.json);

			if(res){
				runInAction(() => this.products.push({ id, cnt: 1 }));
			}
		}
	}

	remove(id){
		if(this.inCart(id)){
			this.products = this.products.filter(pr => pr.id !== id);
		}
	}

	change(id, cnt){
		if(this.inCart(id)){
			let index = this.products.findIndex(pr => pr.id === id);
			this.products[index].cnt = cnt;
		}
	}


	async load(){
		let response = await fetch('');
		let products = await response.json();
		runInAction(() => { this.products = products });
	}

	// change(id, val){
	// 	let item = this.getById(id);
	// 	console.log(item);
	// }

	constructor(){
		makeObservable(this, {
			products: observable,
			productsDetailed: computed,
			total: computed,
			add: action.bound,
			remove: action.bound,
			change: action.bound
		});

		this.#token = localStorage.getItem('CART_TOKEN');
	}
}

export default new CartStore();

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