import React from 'react';
import logo from '@/img/logo.png'
import styles from './login.module.css';
import { routesMap } from '@/router';

function LoginIcon(){
	return <div className={styles.icon}>
		<Link to={ routesMap.auto }><img src={logo} alt="logo" className={styles.img}/></Link>
		</div>
}

export default LoginIcon;