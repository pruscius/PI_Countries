import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar () {
    return (
        <nav className={styles.navBar}>
            <Link to="/home">
                <button className={styles.homeButton}>Home</button>
            </Link>
            <SearchBar />
            <Link to="/about" className={styles.aboutLink}>
                <p className={styles.about}>About</p>
            </Link>
        </nav>
    )
}
