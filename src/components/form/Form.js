import React from 'react';
import { Link } from "react-router-dom";
import { routesMap } from '@/router';
import styles from './form.module.css';

function Form({btn_text, text, reg}) {

    console.log(reg);

    return (
        <form className={styles.form}>
            <h2>{text}</h2>
            <input type="text" placeholder="email" className={styles.form_input}/>
            <input type="text" placeholder="password" className={styles.form_input}/>
            { !(reg) && <Link to={routesMap.reg}>Зарегистрироваться</Link>}
            <button className={styles.form_btn}>{btn_text}</button>
        </form>
    )
}

export default Form
