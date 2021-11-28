import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { routesMap } from '@/router';
import storesContext from '@/contexts/store';
import styles from './form.module.css';

function Form({btn_text, text, reg, onBtn}) {
    let { user } = useContext(storesContext); // подключение контекста
	let { regUser, authUser } = user; // Распаковка методов

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if(reg){
            regUser(email,password)
        } else {
            authUser(email,password)
        }
        
    };
    
    console.log(reg, email, password);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{text}</h2>
            <input type="text" placeholder="email" className={styles.form_input} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="password" className={styles.form_input} value={password} onChange={(e) => setPassword(e.target.value)}/>
            { !(reg) && <Link to={routesMap.reg}>Зарегистрироваться</Link>}
            <button className={styles.form_btn}>{btn_text}</button>
        </form>
    )
}

export default Form
