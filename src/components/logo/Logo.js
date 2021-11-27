import React from 'react';
import styles from './logo.module.css';
import logo from '@/img/homo_novus.png'
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';

function Logo(){
	return <div className={styles.icon}>
		<Link to={routesMap.root}><img src={logo} alt="logo" className={styles.img}/></Link>
		</div>

}

export default Logo;