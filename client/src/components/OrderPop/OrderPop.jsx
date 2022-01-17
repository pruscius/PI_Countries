import React from 'react';
import { orderCountriesPopAsc, orderCountriesPopDesc } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
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
        <div className={styles.container}>
            <button className={styles.button} name="popAsc" onClick={e => handleClick (e)}>
                <FaArrowUp className={styles.icon} size="0.85em" color="#fff"/>POPULATION
            </button>
            <button className={styles.button} name="popDesc" onClick={handleClick}>
                <FaArrowDown className={styles.icon} size="0.85em" color="#fff"/>POPULATION
            </button>
        </div>
    )
}