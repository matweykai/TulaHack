import React from 'react';
import styles from './header.module.css';

import Logo from '@/components/logo/Logo.js';
import Search from '@/components/search/Search.js';
import LoginIcon from '@/components/login/LoginIcon.js';
import CartIcon from '@/components/cart/CartIcon.js';

function Header(){
	return <header className={styles.header}>

		<Logo></Logo>
        <Search></Search>
        <LoginIcon></LoginIcon>
        <CartIcon></CartIcon>

	</header>
}

export default Header;