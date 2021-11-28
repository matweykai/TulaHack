import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
// import { useParams, useSearchParams} from "react-router-dom";
import storesContext from '@/contexts/store';
import styles from './store.module.css'

function Store({type, location}){
	let { cart, products } = useContext(storesContext); // подключение контекста
	let { add, remove, inCart } = cart; // Распаковка методов
    let { products_list } = products

    // if (type === "category"){
    //     products.load(type='category')
    // }
    // let params = useParams();
    // let [searchParams, setSearchParams] = useSearchParams();
    // console.log( searchParams.get("id") );
    // console.log(location);
   

    let cards = products_list.map((item) => {
        return (
        <div key={ item.id } className={styles.card}>
            <div className={styles.prev}><img className={styles.prev_img} src={item.img_id}/></div>
            <p>{ item.name }</p>

            {
            inCart(item.id) ?
                <button className={styles.btn, styles.btn_remove} onClick={() => cart.remove(item.id)}>Убрать</button>
            :
                <button className={styles.btn, styles.btn_add} onClick={() => cart.add(item.id)}>Добавить</button>
            }

        </div>
    )});

	
	return <div className={styles.store}>
            {cards}
	</div>
}

export default observer(Store);