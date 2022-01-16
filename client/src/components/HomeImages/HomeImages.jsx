import React from 'react';
import styles from './HomeImages.module.css';

export default function HomeImages() {
    return (
        <div className={styles.container}>
            <div className={styles.phrasesContainer}>
                <div className={styles.phraseContainer}>
                    <h1 className={styles.phrase}>Find experiences</h1>
                    <h1 className={styles.phrase}>.</h1>
                </div>
                <div className={styles.phraseContainer}>
                    <h1 className={styles.phrase}>Anywhere</h1>
                    <h1 className={styles.phrase}>.</h1>
                </div>
            </div>
        </div>
    )
}