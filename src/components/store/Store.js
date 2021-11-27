import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import styles from './store.module.css'

function Store(){
	// let { products } = useContext(storesContext); // подключение контекста
	// let { ... } = cart; // Распаковка методов

    let TEST_DATA = [
        {
            id: 1,
            name: "Фрукты",
            img: "../public/img/tomato.jpg",
        },
        {
            id: 2,
            name: "Фрукты",
            img: "../public/img/tomato.jpg",
        },
        {
            id: 3,
            name: "Фрукты",
            img: "../public/img/tomato.jpg",
        },
        {
            id: 4,
            name: "Фрукты",
            img: "../public/img/tomato.jpg",
        },
        {
            id: 5,
            name: "Фрукты",
            img: "../public/img/tomato.jpg",
        },
        {
            id: 6,
            name: "Фрукты",
            img: "../public/img/tomato.jpg",
        },
    ];

    let inCart = [];


    let cards = TEST_DATA.map((item) => {
        return (
        <div key={ item.id } className={styles.card}>
            <div className={styles.prev}><img className={styles.prev_img} src={item.img}/></div>
            <p>{ item.name }</p>
            <button className={styles.btn, styles.btn_add}>Добавить</button>
        </div>
    )});

	
	return <div className={styles.store}>
            {cards}
	</div>
}

export default observer(Store);