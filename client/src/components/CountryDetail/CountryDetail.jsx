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

    console.log(typeof country)
    
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
                    Object.keys(country).length > 1 && country !== 'No country found.' ?
                    <div key={country.id} className={styles.card}>
                        <div className={styles.dataContainer}>
                            <h4 className={styles.dataTitle}>Continent</h4>
                            <h4 className={styles.dataValue}>{country.region}</h4>
                        </div>
                        <div className={styles.dataContainer}>
                            <h4 className={styles.dataTitle}>Population</h4>
                            <h4 className={styles.dataValue}>{country.population.toLocaleString('en-US')}</h4>
                        </div>
                        <div className={styles.dataContainer}>
                            <h4 className={styles.dataTitle}>Capital</h4>
                            <h4 className={styles.dataValue}>{country.capital}</h4>
                        </div>
                        <div className={styles.dataContainer}>
                            <h4 className={styles.dataTitle}>Sub-region</h4>
                            <h4 className={styles.dataValue}>{country.subregion}</h4>
                        </div>
                        <div className={styles.dataContainer}>
                            <h4 className={styles.dataTitle}>Area</h4>
                            <h4 className={styles.dataValue}>{country.area.toLocaleString('en-US')} km²</h4>
                        </div>
                    </div>
                    :
                    <h3>Error 404 Not Found</h3>
                }
            </div>
            <div className={styles.activitiesContainer}>
                <h1>Activities</h1>

                {
                    Object.keys(country).length > 1 && country !== 'No country found.' && country.activities.length ?
                    country.activities.map((a, index) => (
                        <p key={index}><strong>{a.name}</strong> in {a.seasons}</p>
                    ))
                    : 
                    <h2>No activities posted yet.</h2>
                }

            </div>
        </div>
    )
}