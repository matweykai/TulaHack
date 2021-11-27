import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';

import { routesMap } from '@/router';
import styles from './cart.module.css'

import Counter from '@/components/counter/Counter.js' 

function CartItem({data}){
	let { cart } = useContext(storesContext); // подключение контекста
	let { change } = cart; // Распаковка методов


	return <>
        <div className={styles.row}>
            <div className={styles.row_prev}><img className={styles.row_prev_img} src={data.img}/></div>
            <div className={styles.row_text}>
                <p className={styles.row_text_title}>{ data.name }</p>
                <p className={styles.row_text_desc}>{ data.desc }</p>
            </div>
            
            

            <div className={styles.row_price}>
                <div className={styles.row_controls}>
                    <Counter current={data.cnt} onChange={val => change(data.id, val)} ></Counter>
                </div>
                <div className={styles.row_total}>{data.cnt * data.price}</div>
            </div>

            
        </div>
	</>
}



export default observer(CartItem);