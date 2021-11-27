import React from 'react';
import styles from './search.module.css';

function Search(){
	return <input type="text" className={styles.search_input}/>
}

export default Search;