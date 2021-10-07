import React from "react";
import styles from './Pagination.module.css';

export default function Pagination ({ countries, countriesPerPage, pagination}) {
    
    const pageNumbers = [];
    
    // este for lo que hace es crear los números de la página, hasta cubrir todos los countries
    for (let i = 1; i <= Math.ceil(countries/countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.ul}>
                 {/*acá creo los anchors de los números de las páginas (alrededor de 24/25)*/}
                { pageNumbers?.map(n => (
                    <li key={n} className={styles.list}>
                       <button onClick={() => pagination(n)}>{n}</button>    
                    </li>
                ))}
            </ul>
        </nav>
    )
}