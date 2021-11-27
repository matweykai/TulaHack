import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import { routesMap } from '@/router';
import styles from './cart.module.css'


import CartItem from './CartItem';

function Cart(){
	let { cart } = useContext(storesContext); // подключение контекста
	let { products, total } = cart; // Распаковка методов

    let itemRows = products.map((item) => {
        return (
        <CartItem data={item} key={item.id}></CartItem>
    )});

	return <>

        <p className={styles.mode_title}>Выберите критерий расчёта стоимости</p>
        <div className={styles.mode}>
            <button className={styles.mode_btn}>По цене</button>
            <button className={styles.mode_btn}>По времени</button>
            <button className={styles.mode_btn}>По баланс</button>
            <button className={styles.mode_btn}>Ручной режим</button>
        </div>

        <div className={styles.cart}>
            {itemRows}
        </div>

        <div className={styles.total}>{ total }</div>
	</>
}



export default observer(Cart);