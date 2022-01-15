import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterByContinent, getActivities, filterByActivity, getCountriesAZ } from '../../actions/actions.js';
import Country from '../Country/Country.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import NavBar from "../NavBar/NavBar.jsx";
import OrderAlph from "../OrderAlph/OrderAlph.jsx";
import OrderPop from "../OrderPop/OrderPop.jsx";
import Loader from "react-loader-spinner";
import styles from './Home.module.css'; 

export default function Home () {
    const countries = useSelector(s => s.filteredCountries);
    const activities = useSelector(s => s.filteredActivities)
    const allCountries = useSelector(s => s.countries);
    const dispatch = useDispatch();

    const [regionFilter, setRegionFilter] = useState('');
    const [ascDesc, setAscDesc] = useState('');
    const [order, setOrder] = useState(''); // Utilizado para que haya un cambio y se re-renderice la pag
    const [currentPage, setCurrentPage] = useState(1); // Página que se muestra en el momento
    const [countriesPerPage, setCountriesPerPage] = useState(12); // Cantidad de países por página
    const indexLastCountry = currentPage * countriesPerPage; 
    const indexFirstCountry = indexLastCountry - countriesPerPage; 
    // let currentCountries = currentPage === 1 ? countries.slice(indexFirstCountry, indexLastCountry - 1) 
    //     : countries.slice(indexFirstCountry - 1, indexLastCountry); // 9 en la primera y 10 en el resto
    const currentCountries = countries.slice(indexFirstCountry, indexLastCountry) // 10 en todas.
    // Esta es la porción del array del estado filteredCountries que queremos que se rendereice.


    // Esta función se la pasamos por props al componente Pagination.
    // Sirve para que cuando clickeamos en un botón del paginado, se ejecute con el valor de ese botón,
    // y setee la página al valor del mismo.
    // Entonces, cuando modificamos el valor del estado de la página actual, obtenemos el índice del último
    // país de la página; consecuentemente el del primero; y mostramos la porción del array del estado global
    // que se encuentra entre esos dos índices.
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);
    
    function handleRefreshClick(){
        setCurrentPage(1);
        dispatch(getCountries()); // resetea el estado global a todos los países.
    };
    
    function handleFilterContinent(e) {
        dispatch(filterByContinent(e.target.value));
    };

    function handleFilterActivity(e){
        dispatch(filterByActivity(e.target.value));
    }

    // handlers para los cambios de los selects de order/filter del back
    function handleChangeFilter(e){
        setRegionFilter(e.target.value)
    }

    function handleChangeAscDesc(e){
        setAscDesc(e.target.value)
    }

    // handle para el submit de los order/filter del back
    function handleNewSubmit(e) {
        e.preventDefault();
        dispatch(getCountriesAZ({regionFilter: regionFilter, ascDesc: ascDesc}))
        setRegionFilter('');
        setAscDesc('');
    }
    
    return (
        <div className={styles.body}>
            <div className={styles.nav}>
                <NavBar />
            </div>
            <div className={styles.menu}>
                <div className={styles.buttons}>
                    {/* Les pasamos la función setOrder para que puedan efectuar un cambio en un estado local
                    y así poder volver a renderizar la página */}
                    <OrderAlph setOrder={setOrder} />
                    <OrderPop  setOrder={setOrder}/>
                    <div>
                        <button className={styles.button} onClick={handleRefreshClick}>Refresh Countries</button>
                    </div>
                </div>
                
                <div className={styles.filtersCont}>
                    <div className={styles.filters}>
                        <select className={styles.select} onChange={(e) => { handleFilterContinent(e) }}>
                            <option value="All">Filter By Continent</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">Americas</option>
                            <option value="Antarctic">Antarctic</option>
                            <option value="Antarctic Ocean">Antarctic Ocean</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                            <option value="Polar">Polar</option>                        
                        </select>
                        <select className={styles.select} onChange={e => handleFilterActivity(e)}>
                            <option value="All">Filter By Activity</option>
                            {  
                                activities?.map(a => (
                                    <option>{a.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        {/* BOTON PARA TRAER LOS FILTRADOS Y ORDENAMIENTOS DESDE EL BACK */}
                        <form onSubmit={e=>handleNewSubmit(e)}>    
                            <select className={styles.select} onChange={e=>handleChangeFilter(e)}>
                                <option value="Americas">America</option>
                                <option value="Africa">Africa</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                            <select className={styles.select} onChange={e=>handleChangeAscDesc(e)}>
                                <option value="desc">Ascending</option>
                                <option value="asc">Descending</option>
                            </select>
                            <input className={styles.button}
                            type="submit"
                            value="Order"
                            />
                        </form>
                    </div>
                </div>
            </div>
            { 
                allCountries.length > 0 ? 
                <>
                    <div>
                        {/* acá renderizamos los números del paginado y le pasamos las props que necesita */}
                        <Pagination 
                            countriesPerPage={countriesPerPage}
                            countries={countries.length}
                            pagination={pagination}
                        />
                    </div>           
                    <div className={styles.countries}>
                        {
                            // acá vamos a renderizar sólo la porción correspondiente del estado global filteredCountries
                            currentCountries === "No country" ? 
                            <p className={styles.texts} >No country found</p> :
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
                </>
                :
                <div className={styles.loader}>
                    <Loader 
                        type="Oval"
                        color="#ca9369"
                        height={100}
                        width={100}
                    />
                </div>
            }
        </div>
    )
}