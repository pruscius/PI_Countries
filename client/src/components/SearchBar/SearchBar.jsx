import React, { useState } from "react";
import { connect } from 'react-redux';
import { getCountryName } from '../../actions/actions.js';
import styles from './SearchBar.module.css';

function SearchBar ({ countries, getCountryName }) {

    const [name, setName] = useState('')

    function handleChange(e){
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        getCountryName(name)
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.input}>
                <input 
                    name="countryName" 
                    type="text" 
                    placeholder="Search countries..."
                    value={name}
                    onChange={handleChange}
                />
                <input type="submit" value="Search" />
            </form>
    )
}

const mapStateToProps = (state) => {
    return {
        countries: state.filteredCountries
    }
} 

export default connect (mapStateToProps, { getCountryName })(SearchBar)