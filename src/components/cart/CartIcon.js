import React from 'react';
import logo from '@/img/cart.png'
import styles from './cart.module.css';
import { Link } from 'react-router-dom'
import { routesMap } from '@/router';

function CartIcon(){
	return <div className={styles.icon}>
		<Link to={ routesMap.cart }><img src={logo} alt="logo" className={styles.img}/></Link>
		</div>
}

export default CartIcon;