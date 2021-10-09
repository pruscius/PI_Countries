import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterByContinent, getActivities, filterByActivity } from '../../actions/actions.js';
import Country from '../Country/Country.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import NavBar from "../NavBar/NavBar.jsx";
import OrderAlph from "../OrderAlph/OrderAlph.jsx";
import OrderPop from "../OrderPop/OrderPop.jsx";
import styles from './Home.module.css'; 

export default function Home () {
    const countries = useSelector(s => s.filteredCountries);
    const activities = useSelector(s => s.filteredActivities)
    const dispatch = useDispatch();

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
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);
    
    function handleRefreshClick(){
        dispatch(getCountries());
    };
    
    function handleFilterContinent(e) {
        dispatch(filterByContinent(e.target.value));
    };

    function handleFilterActivity(e){
        dispatch(filterByActivity(e.target.value));
    }
    
    return (
        <div>
            <NavBar />
            <div className={styles.selects}>
                <div className={styles.filter}>
                    <h4>Filter By:</h4>
                    <p>Continent: </p>
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
                    <p>Activity</p>
                    <select onChange={e => handleFilterActivity(e)}>
                        <option value="All">All</option>
                        {  
                            activities?.map(a => (
                                <option>{a.name}</option>
                            ))
                        }
                    </select>
                </div>
                <OrderAlph order={order} setOrder={setOrder} />
                <OrderPop  order={order} setOrder={setOrder}/>
                <div>
                    <button onClick={handleRefreshClick}>Refresh Countries</button>
                    <Link to="/postActivity">
                        <button>Create Activity</button>
                    </Link>
                </div>
            </div>
            <div>
                <Pagination 
                    countriesPerPage={countriesPerPage}
                    countries={countries.length}
                    pagination={pagination}
                />
            </div>           
            <div>
                {
                    currentCountries === "No country" ? 
                    <p>No country found</p> :
                    currentCountries.map(c=> (
                        <Country 
                        id={c.id}
                        name={c.name}
                        flag={c.flag}
                        region={c.region}
                        population={c.population}
                        />
                    ))
                }
            </div>
            <div>
                <Pagination 
                    countriesPerPage={countriesPerPage}
                    countries={countries.length}
                    pagination={pagination}
                />
            </div>             
        </div>
    )
}