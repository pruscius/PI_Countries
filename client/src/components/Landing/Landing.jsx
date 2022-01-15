import React from "react";
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing () {
    return (
        <div className={styles.landing}>
            <div className={styles.divName}>
                <h1 className={styles.name}>Countrivities</h1>
            </div>
            <div className={styles.buttonDiv}>
                <Link className={styles.link} to="/home">
                    <button className={styles.button}>DISCOVER</button>
                </Link>
            </div>
            <div className={styles.divSlogan}>
                <h1 className={styles.slogan}>YOU PICK THE PLACE
                    <br/>
                    WE SET THE STAGE
                </h1>
            </div>
        </div>


    )
}