import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import storesContext from '@/contexts/store';
import styles from './categoryMenu.module.css'

function CategoryMenu(){
	// let { products } = useContext(storesContext); // подключение контекста
	// let { ... } = cart; // Распаковка методов

    let TEST_DATA = [
        {
            id: 1,
            name: "Фрукты"
        },
        {
            id: 2,
            name: "Овощи"
        },
        {
            id: 3,
            name: "Мясо"
        },
        {
            id: 4,
            name: "Орехи"
        },
        {
            id: 5,
            name: "Молоко"
        },
        {
            id: 6,
            name: "Сыры"
        },
        {
            id: 7,
            name: "Рыба"
        },
    ];


    let catigories = TEST_DATA.map((item) => {
        return (
        <li key={ item.id } className={styles.category_item}>
            <Link to={'/category/id=' +  item.id } className={styles.category_link}>{item.name}</Link>
        </li>
    )});

	
	return <>
    <div className={styles.category_menu}>
        <ul className={styles.category_list}>
            {catigories}
        </ul>
    </div>	
	</>
}

export default observer(CategoryMenu);