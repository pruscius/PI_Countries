import React from "react";
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing () {
    return (
        <div className={styles.landing}>
            <div className={styles.buttonDiv}>
                <Link to="/home">
                    <button className={styles.button}>ENTER</button>
                </Link>
            </div>
            <div className={styles.divText}>
                <h1 className={styles.text}>COUNTRIVITIES</h1>
            </div>
        </div>


    )
}