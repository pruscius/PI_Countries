import React from 'react';
import { orderCountriesPopAsc, orderCountriesPopDesc } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import styles from './OrderPop.module.css';

export default function OrderPop({ setOrder }) {

    const dispatch = useDispatch();
    
    function handleClick(e) {
        if (e.target.name === "popAsc") {
            dispatch(orderCountriesPopAsc());     
            setOrder('popAsc')   
        }
        if (e.target.name === "popDesc") {
            dispatch(orderCountriesPopDesc());
            setOrder('popDesc');
        }
    }
    
    return (
        <div>
            <button className={styles.button} name="popAsc" onClick={e => handleClick (e)}>HIGHEST POPULATION</button>
            <button className={styles.button} name="popDesc" onClick={handleClick}>LOWEST POPULATION</button>
        </div>
    )
}