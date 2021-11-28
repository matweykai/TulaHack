import { makeObservable, action, observable, runInAction } from 'mobx';

class UserStore{

    token = null;
    URL = 'http://127.0.0.1:8000/api/'

    async regUser(log, pass){
		let response = await fetch(URL+`register/?login=${log}&pass=${pass}`);
        console.log("отвтет от регистрации", response);
		let responseJSON = await response.json();
        console.log(responseJSON);
        localStorage.setItem('CART_TOKEN', 'responseJSON');
		runInAction(() => { this.token = responseJSON });
	}

    async authUser(log, pass){
		let response = await fetch(URL+`authorize/?login=${log}&pass=${pass}`);
        console.log("отвтет от авторизации", response);
		let responseJSON = await response.json();
        console.log(responseJSON);
        localStorage.setItem('CART_TOKEN', 'responseJSON');
		runInAction(() => { this.token = responseJSON });
	}

	constructor(){
		makeObservable(this, {
            regUser: action.bound,
            authUser: action.bound
		});

        this.token = localStorage.getItem('CART_TOKEN');
	}
    
}

export default new UserStore();