import React from 'react';
import { orderCountriesAlphAZ, orderCountriesAlphZA } from '../../actions/actions.js';
import { useDispatch } from 'react-redux';
import styles from './OrderAlph.module.css';

export default function OrderAlph({ setOrder }) {

    const dispatch = useDispatch();
    
    function handleClick(e) {
        if (e.target.name === "AZ") {
            dispatch(orderCountriesAlphAZ());
            setOrder('AZ')
        }
        if (e.target.name === "ZA") {
            dispatch(orderCountriesAlphZA());
            setOrder('ZA');
        }
    }
    
    return (
        <div className={styles.container}>
            <button className={styles.button} name="AZ" onClick={handleClick}>A-Z</button>
            <button className={styles.button} name="ZA" onClick={handleClick}>Z-A</button>
        </div>
    )
}