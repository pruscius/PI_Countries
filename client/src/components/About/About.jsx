import React from "react";
import { Link } from 'react-router-dom';
import styles from './About.module.css';

export default function About(){
    return (
        <div className={styles.body}>
            <Link to="/home">
                <button className={styles.btn}>Home</button>
            </Link>
            <h2 className={styles.about}>About</h2>
            <p className={styles.text}> This is an individual project developed by Andrés Frank, for the puropse of evaluation 
                from the teaching instructors at Henry School of Web Development.
            </p>
        </div>
    )
}