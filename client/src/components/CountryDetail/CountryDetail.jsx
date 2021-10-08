import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetail } from '../../actions/actions.js';
import styles from './CountryDetail.module.css';

function CountryDetail ({ country, getDetail }) {
    const { id } = useParams();

    useEffect(() => {
        getDetail(id)
    }, [getDetail, id]);

    return (
        <div>
            <Link to="/home">
                <button>Home</button>
            </Link>
            {
                country ?
                <div key={country.id} className={styles.card}>
                    <h1>{country.name}</h1>
                    <img src={country.flag} alt="Not found" className={styles.flag}/>
                    <p>Continent: {country.region}</p>
                    <p>Population: {country.population}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Sub-region: {country.subregion}</p>
                    <p>Area: {country.area} kms2</p>
                    <p>Activities: </p>
                    {
                        country.activities?.map(a => (
                            <p>{a}</p>
                        ))
                    }
                </div> : 
                <h3>Error 404 Not Found</h3>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        country: state.countryDetail
    }
}
export default connect (mapStateToProps, { getDetail })(CountryDetail)