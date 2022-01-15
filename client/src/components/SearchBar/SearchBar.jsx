import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountryName } from '../../actions/actions.js';
import styles from './SearchBar.module.css';

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
                    placeholder="Search country"
                    value={name}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input type="submit" value="Search" className={styles.searchBtn}/>
            </form>
    )
}
