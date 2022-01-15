import React from "react";
import styles from './Country.module.css';
import { Link } from 'react-router-dom';

export default function Country({ id, name, flag, region, population }) {
    return (
        <Link to={`/countries/${id}`} className={styles.link}>
            <div key={id} className={styles.card}>
                <h3>{name}</h3>
                <img src={flag} className={styles.flag} alt="Not found"/>
                <h4>{region}</h4>
                {/* <h5>Population: {population.toLocaleString('en-US')}</h5> */}
            </div>
        </Link>
    )
}