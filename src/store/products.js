import { makeObservable, action, observable, runInAction } from 'mobx';
import userStore from './user';

let TEST_DATA = [
	{
		id: 1,
		cnt: 1,
		price: 200,
		name: "banana",
		img: "../public/img/banana.png",
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
		img: "../public/img/chiken.jpg",
		desc: "Вкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананы"
	},
	{
		id: 4,
		cnt: 1,
		price: 120,
		name: "Молоко",
		img: "../public/img/milk.jpg",
		desc: "Вкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананы"
	},
	{
		id: 5,
		cnt: 1,
		price: 110,
		name: "Каша",
		img: "../public/img/kasha.png",
		desc: "Вкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананы"
	},
	{
		id: 6,
		cnt: 1,
		price: 110,
		name: "Малина",
		img: "../public/img/malina.jpg",
		desc: "Вкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананыВкусные и питательные, африканские бананы"
	},

];

class ProductsStore{
	products_list = TEST_DATA;
	URL = userStore.URL


	getById = id => this.products.find(pr => pr.id === id);

	async load(page, type=""){
		if (type === "category"){
			console.log('Категории загружены!');
			// let response = await fetch('');
			// let products = await response.json();
			// runInAction(() => { this.products_list = products });
		} else {
			let response = await fetch(this.URL + 'goods/');
			let products = await response.json();
			runInAction(() => { this.products_list = products });
		}
		
	}

	constructor(){
		makeObservable(this, {
			products_list: observable,
			load: action
		});
	}
}

export default new ProductsStore();