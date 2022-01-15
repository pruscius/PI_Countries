import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar () {
    return (
        <nav className={styles.navBar}>
            <div className={styles.nameHome}>
                <h1 className={styles.brandName}>Countrivities</h1> 
                <Link to="/home">
                    <button className={styles.homeButton}>Home</button>
                </Link>
            </div>
            <div className={styles.searchBar}>
                <SearchBar />
            </div>
            <Link to="/postActivity">
                <button className={styles.createActBtn}>Create Activity</button>
            </Link>
            <Link to="/about" className={styles.aboutLink}>
                <p className={styles.about}>About</p>
            </Link>
        </nav>
    )
}
