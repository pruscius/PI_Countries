import React from 'react';
import { BsLinkedin, BsGithub } from "react-icons/bs";
import styles from './Footer.module.css';

export default function Footer() {
    return ( 
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a href="https://www.linkedin.com/in/andres-frank/" target="_blank">
                    <BsLinkedin size="2.3em" color="#000000" />
                </a>
                <a href="https://github.com/pruscius" target="_blank">
                    <BsGithub size="2.3em" color="#000000" />
                </a>            
            </div>
        </div>
    )
}