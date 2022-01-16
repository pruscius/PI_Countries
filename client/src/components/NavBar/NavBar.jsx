import React from "react";
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { IoCreateOutline } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";

export default function NavBar () {
    return (
        <div className={styles.navBar}>
            <div className={styles.nameCont}>
                <Link className={styles.link} to="/home">
                    <h2 className={styles.brandName}>Countrivities</h2> 
                </Link>
                <GiWorld color="#fff" size="1.5em"/>
            </div>
            <div className={styles.options}>
                <div className={styles.optionDiv}>
                    <Link className={styles.link} to="/home">
                        <AiOutlineHome className={styles.iconHome} size="1.2em" color="#fff"/>
                        <h4 className={styles.btn}>Home</h4>
                    </Link>
                </div>
                <div className={styles.optionDiv}>
                    <Link className={styles.link} to="/postActivity">
                        <IoCreateOutline className={styles.iconAct} size="1.3em" color="#fff"/>
                        <h4 className={styles.btn}>Activity</h4>
                    </Link>
                </div>
                <div className={styles.optionDiv}>
                </div>
            </div>
        </div>
    )
}
