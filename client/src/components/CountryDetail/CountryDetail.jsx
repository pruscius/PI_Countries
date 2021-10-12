import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../../actions/actions.js';
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
            <Link to="/home">
                <button className={styles.btn}>Home</button>
            </Link>
            {
                country ?
                <div key={country.id} className={styles.card}>
                    <h1>{country.name.toUpperCase()}</h1>
                    <a href={country.flag}>
                    <img src={country.flag}alt="Not found" className={styles.flag}/>
                    </a>
                    <p className={styles.p}>Continent: {country.region}</p>
                    <p className={styles.p}>Population: {country.population}</p>
                    <p className={styles.p}>Capital: {country.capital}</p>
                    <p className={styles.p}>Sub-region: {country.subregion}</p>
                    <p className={styles.p}>Area: {country.area} kms2</p>
                    <p className={styles.p}>Activities: </p>
                    {
                        country.activities?.map(a => (
                            <p className={styles.p}>{a.name} in {a.seasons}</p>
                        ))
                    }
                </div> : 
                <h3>Error 404 Not Found</h3>
            }
        </div>
    )
}