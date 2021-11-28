import { makeObservable, action, observable, runInAction, computed } from 'mobx';
import { useState } from 'react';
import productsStore from './products';
import userStore from './user';

let cardItems = [];

class CartStore{
	products = cardItems;
	token = userStore.token;
	URL = userStore.URL

	// тру тотал 
	get total(){
		return this.products.reduce((acc, pr) => acc + pr.price * pr.cnt, 0);
	}

	inCart = (id) => this.products.some(pr => pr.id === id);
	
	async add(id, token){
		if(!this.inCart(id)){
			let res = await fetch(this.URL + `cart/?token=${token}&id=${id}`).then(r => r.json);

			if(res){
				runInAction(() => {
					this.products.push(productsStore.products_list.find(pr => pr.id === id))
				});
			}
		}
	}

	// add(id){
	// 	this.products.push(productsStore.products_list.find(pr => pr.id === id))
	// }

	async remove(id){
		if(this.inCart(id)){
			this.products = this.products.filter(pr => pr.id !== id);
			let res = await fetch(this.URL + `cart_r/?token=${this.token}&id=${id}`).then(r => r.json);
		}
	}

	change(id, cnt){
		if(this.inCart(id)){
			let index = this.products.findIndex(pr => pr.id === id);
			this.products[index].cnt = cnt;
		}
	}

	async update(token, mode=1){
		let response = await fetch(URL + 'goods/');
	}


	async load(){
		let response = await fetch(URL + `cart/?token=${this.token}`);
		let products = await response.json();
		runInAction(() => { this.products = products });
	}

	async push(){
		// let response = await fetch('');
		// let products = await response.json();
		// runInAction(() => { this.products = products });

		// const requestOptions = {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(
		// 	{
		// 		token: this.#token,

		// 	})
		// };
		// const response = await fetch('https://reqres.in/api/posts', requestOptions);
		// const data = await response.json();
		// this.setState({ postId: data.id });
	}

	// change(id, val){
	// 	let item = this.getById(id);
	// 	console.log(item);
	// }

	constructor(){
		makeObservable(this, {
			products: observable,
			total: computed,
			add: action.bound,
			remove: action.bound,
			change: action.bound,
			load: action.bound,	
		});
	}
}

export default new CartStore();
