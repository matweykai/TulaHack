import React from 'react';
import styles from './search.module.css';

function Search(){
	return <input type="text" className={styles.search_input} placeholder="Поиск..."/>
}

export default Search;