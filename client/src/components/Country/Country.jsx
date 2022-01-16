import React from "react";
import styles from './Country.module.css';
import { Link } from 'react-router-dom';

export default function Country({ id, name, flag, region, population }) {
    return (
        // <div style={{backgroundImage: `url(${flag})`}} className={styles.container}>
        <div className={styles.container}>
            <img src={flag} className={styles.flag} alt="Not found"/>
            <Link to={`/countries/${id}`} className={styles.link}>
                <div key={id} className={styles.card}>
                    <h3 className={styles.name}>{name}</h3>
                    <h4 className={styles.continent}>{region}</h4>
                </div>
            </Link>
        </div>
    )
}