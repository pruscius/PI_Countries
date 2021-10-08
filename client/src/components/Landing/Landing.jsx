import React from "react";
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing () {
    return (
        <Link to="/home">
            <div className={styles.landing}>
              <button>Home</button>
            </div>
        </Link>
    )
}