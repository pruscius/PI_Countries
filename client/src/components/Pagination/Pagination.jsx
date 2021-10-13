import React from "react";
import styles from './Pagination.module.css';

export default function Pagination ({ countries, countriesPerPage, pagination}) {
    
    // pageNumbers es un array en el que se van a pushear la cantidad de números que va a tener el paginado
    const pageNumbers = [];
    
    // este for lo que hace es crear los números de la página, hasta cubrir todos los countries.
    // countries es countries.length (un número). Va a depender de si estamos filtrando o no.
    for (let i = 1; i <= Math.floor(countries/countriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
            {/*acá creo los anchors de los números de las páginas (alrededor de 24/25) cuando countries=full*/}
                { pageNumbers?.map(n => (
                    <li key={n} className={styles.list}>
                       <button className={styles.pagBtn} onClick={() => pagination(n)}>{n}</button>    
                    </li>
                ))}
            </ul>
        </nav>
    )
}