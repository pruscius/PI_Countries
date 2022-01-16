import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar.jsx';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../../actions/actions.js';
import { IoArrowBack } from "react-icons/io5";
import styles from './CountryDetail.module.css';

export default function CountryDetail () {
    const country = useSelector(s => s.countryDetail)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]);

    return (
        <div className={styles.body}>
            <NavBar />
            
            
            
            <div className={styles.header}>
                <Link to="/home">
                    <IoArrowBack size="2.3em" color="#fff" className={styles.back}/>
                </Link>
                <div className={styles.nameFlagContainer}>
                    <h1 className={styles.name}>{country.name}
                        <img src={country.flag} alt="Not found" className={styles.flag}/>
                    </h1>
                </div>
            </div>




            <div className={styles.outerCard}>
            {   
                typeof country === 'object' ?
                <div key={country.id} className={styles.card}>
                    <p className={styles.p}>Continent: {country.region}</p>
                    <p className={styles.p}>Population: {country.population}</p>
                    <p className={styles.p}>Capital: {country.capital}</p>
                    <p className={styles.p}>Sub-region: {country.subregion}</p>
                    <p className={styles.p}>Area: {country.area} kms2</p>
                    {
                        country.activities?.map(a => (
                            <>
                                <p className={styles.p}>Activities: </p>
                                <p className={styles.p}>{a.name} in {a.seasons}</p>
                            </>
                        ))
                    }
                </div> : 
                <h3>Error 404 Not Found</h3>
            }
            </div>
        </div>
    )
}