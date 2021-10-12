import React from 'react';
import { orderCountriesAlphAZ, orderCountriesAlphZA } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import styles from './OrderAlph.module.css';

export default function OrderAlph({ order, setOrder }) {

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
        <div>
            <button className={styles.button} name="AZ" onClick={e => handleClick (e)}>A-Z</button>
            <button className={styles.button} name="ZA" onClick={handleClick}>Z-A</button>
        </div>
    )
}