import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './counter.module.css';

Counter.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	current: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
}

Counter.defaultProps = {
	min: 1,
	max: 100
}

function Counter({ min, max, current, onChange }){ 
	let inp = useRef();
	let updInp = num => inp.current.value = num;

	let dec = () => applyCurrent(current - 1);
	let inc = () => applyCurrent(current + 1);

	let applyStrValue = e => {
		let val = parseInt(e.target.value);
		applyCurrent(isNaN(val) ? min : val);
	}

	let applyCurrent = (number) => {
		let newCurrent = Math.max(min, Math.min(number, max));
		updInp(newCurrent);

		if(current !== newCurrent){
			onChange(newCurrent);
		}
	}
	
	useEffect(() => updInp(current), [current]);

	return <>
		<button className={styles.row_controls_btn} type="button" onClick={dec} disabled={current <= min}>-</button>&nbsp;
		<input ref={inp} defaultValue={current} onBlur={applyStrValue} className={styles.row_controls_input} />&nbsp;
		<button className={styles.row_controls_btn} type="button" onClick={inc} disabled={current >= max}>+</button>
	</>
}

export default Counter;