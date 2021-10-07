import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { getCountries, filterByContinent, orderAlph } from '../../actions/actions.js';
import Country from '../Country/Country.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import styles from './Home.module.css'; 

function Home ({ countries, getCountries, filterByContinent, orderAlph }) {
    const [input, setInput] = useState('');
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10); 
    const indexLastCountry = currentPage * countriesPerPage; // 10
    const indexFirstCountry = indexLastCountry - countriesPerPage; // 0
    const currentCountries = countries.slice(indexFirstCountry, indexLastCountry);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    useEffect(() => {
        getCountries()        
    }, [getCountries]);

    function handleChange(e){
        setInput(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        alert(input);
        // fetchCountry(input);
        setInput('');
    };

    function handleFilterContinent(e) {
        filterByContinent(e.target.value);
    };

    function handleSort(e) {
        e.preventDefault();
        orderAlph(e.target.value);
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.input}>
                <input 
                    name="countryName" 
                    type="text" 
                    placeholder="Search countries..."
                    value={input}
                    onChange={handleChange}
                />
                <input type="submit" value="Search" />
            </form>
            <div className={styles.selects}>
                <div className={styles.filter}>
                    <h4>Filter By:</h4>
                    <select onChange={(e) => { handleFilterContinent(e) }}>
                        <option value="All">All</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Antarctic">Antarctic</option>
                        <option value="Antarctic Ocean">Antarctic Ocean</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Polar">Polar</option>                        
                    </select>
                    <select>
                        <option>- Select Activity -</option>
                    </select>
                </div>
                <div className={styles.order}>
                    <h4>Order By:</h4>
                    <select className={styles.alph_pop}>
                        <option value="alph">Alphabetical Order</option>
                        <option value="population">Population Count</option>
                    </select>
                    <select onChange={e => handleSort(e)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>           
            <Pagination 
                countriesPerPage={countriesPerPage}
                countries={countries.length}
                pagination={pagination}
            />
            <div>
                {
                    currentCountries?.map(c=> (
                        <Country 
                        id={c.id}
                        name={c.name}
                        flag={c.flag} 
                        region={c.region}
                        />
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        countries: state.filteredCountries
    }
}

export default connect(mapStateToProps, { getCountries, filterByContinent, orderAlph })(Home);