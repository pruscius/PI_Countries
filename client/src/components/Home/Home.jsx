import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterByContinent, orderCountries } from '../../actions/actions.js';
import Country from '../Country/Country.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import NavBar from "../NavBar/NavBar.jsx";
import OrderAlph from "../OrderAlph/OrderAlph.jsx";
import OrderPop from "../OrderPop/OrderPop.jsx";
import styles from './Home.module.css'; 

export default function Home () {
    const countries = useSelector(s => s.filteredCountries);
    const dispatch = useDispatch();

    const [payload, setPayload] = useState({
        ascDesc: 'asc',
        alphPop: ''
    });
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
    }, [dispatch]);
    
    function handleRefreshClick(){
        dispatch(getCountries());
    };
    
    function handleFilterContinent(e) {
        dispatch(filterByContinent(e.target.value));
    };


    // function handleClick() {
    //     dispatch(orderCountries(payload));
    //     setOrder(`Ordered ${payload}`);
    // };

    // function handleAlphPop(e) {
    //     e.preventDefault();
    //     setPayload({...payload, alphPop: e.target.value});
    // };

    // function handleAscDesc(e){
    //     e.preventDefault();
    //     setPayload({...payload, ascDesc: e.target.value});
    // };

    // function handleAlphPop(e) {
    //     e.preventDefault();
    //     if (payload.alphPop === 'alph') {
    //         // setPayload({...payload, alphPop: e.target.value});
    //         orderCountries(payload);
    //         console.log('handleAlphPop', payload);
    //         setPayload({...payload, alphPop: 'pop'})
    //     }
    //     if (payload.alphPop === 'pop') {
    //         // setPayload({...payload, alphPop: e.target.value});
    //         orderCountries(payload);
    //         console.log('handleAlphPop', payload);
    //         setPayload({...payload, alphPop: 'alph'})
    //     }
    // }

    // function handleAscDesc(e) {
    //     e.preventDefault();
    //     if (payload.ascDesc === 'asc') {
    //         // setPayload({...payload, ascDesc: e.target.value});
    //         console.log('handleAscDesc', payload);
    //         orderCountries(payload);
    //         setPayload({...payload, ascDesc: 'desc'});
    //     }
    //     if (payload.ascDesc === 'desc') {
    //         // setPayload({...payload, ascDesc: e.target.value});
    //         console.log('handleAscDesc', payload);
    //         orderCountries(payload);
    //         setPayload({...payload, ascDesc: 'desc'});
    //     }
    // }

    return (
        <div>
            <NavBar />
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
                <OrderAlph order={order} setOrder={setOrder} />
                <OrderPop  order={order} setOrder={setOrder}/>
                {/* <div className={styles.order}>
                    <h4>Order By:</h4>
                    <select className={styles.alph_pop} 
                        onChange={e => handleAlphPop(e)}>
                        <option>- Select option -</option>
                        <option value="alph">Alphabetical Order</option>
                        <option value="pop">Population Count</option>
                    </select>
                    <select onChange={e => handleAscDesc(e)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <button onClick={handleClick}>Order</button>
                </div> */}
                <div>
                    <button onClick={handleRefreshClick}>Refresh Countries</button>
                    <Link to="/postActivity">
                        <button>Create Activity</button>
                    </Link>
                </div>
            </div>           
            <Pagination 
                countriesPerPage={countriesPerPage}
                countries={countries.length}
                pagination={pagination}
            />
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
        </div>
    )
}