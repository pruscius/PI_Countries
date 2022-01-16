import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountryName } from '../../actions/actions.js';
import styles from './SearchBar.module.css';
import { BsSearch } from "react-icons/bs";

export default function SearchBar () {

    // const countries = useSelector(s => s.filteredCountries); // si lo quiero usar tengo que importar useSec
    const dispatch = useDispatch();

    const [name, setName] = useState('')

    function handleChange(e){
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getCountryName(name));
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input 
                name="countryName" 
                type="text" 
                value={name}
                onChange={handleChange}
                className={styles.input}
                autoComplete="off"
            />
            <BsSearch className={styles.searchBtn} onClick={handleSubmit} size="1.3em" color="rgb(238, 238, 238)" />
        </form>
    )
}
