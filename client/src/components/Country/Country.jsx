import React from "react";
import styles from './Country.module.css';
import { Link } from 'react-router-dom';

export default function Country({ id, name, flag, region, population }) {
    return (
        <Link to={`/countries/${id}`} className={styles.link}>
            <div key={id} className={styles.card}>
                <p>{name.toUpperCase()}</p>
                <img src={flag} className={styles.flag} alt="Not found"/>
                <p>Continent: {region}</p>
                <p>Population: {population}</p>
            </div>
        </Link>
    )
}