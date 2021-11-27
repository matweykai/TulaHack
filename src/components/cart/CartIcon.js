import React from 'react';
import logo from '@/img/logo.png'
import styles from './cart.module.css';

function CartIcon(){
	return <div className={styles.icon}>
		<Link to={ routesMap.reg }><img src={logo} alt="logo" className={styles.img}/></Link>
		</div>
}

export default CartIcon;