import React from "react";
import styles from './Country.module.css';

export default function Country({id, name, flag, region}) {
    return (
        <div key={id}>
            <p>{name}</p>
            <img src={flag} className={styles.flag} alt="Not found"/>
            <p>{region}</p>
        </div>
    )
}