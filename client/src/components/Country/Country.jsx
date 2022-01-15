import React from "react";
import styles from './Country.module.css';
import { Link } from 'react-router-dom';

export default function Country({ id, name, flag, region, population }) {
    return (
        <div className={styles.container}>
            <Link to={`/countries/${id}`} className={styles.link}>
                <div key={id} className={styles.card}>
                    <h3>{name}</h3>
                    <img src={flag} className={styles.flag} alt="Not found"/>
                    <h4>{region}</h4>
                </div>
            </Link>
        </div>
    )
}