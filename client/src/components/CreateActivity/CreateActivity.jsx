import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, orderCountriesAlphAZ } from '../../actions/actions.js';
import NavBar from "../NavBar/NavBar.jsx";
import axios from 'axios';
import styles from './CreateActivity.module.css';

function validate (data, countryId) {
    let errors = {};
    if (!data.name) {
        errors.name = 'Your activity must have a name.';
    }
    if (!data.difficulty) {
        errors.difficulty = 'You must set a difficulty level for your activity.';
    }
    if (!data.duration) { // regexp para float?
        errors.duration = 'Your activity must have a duration set in hours (only dots and numbers)';
    } 
    if(!data.seasons.length) { 
        errors.seasons = 'You must set at least one season for your activity';
    } 
    if (!countryId.length) {
        errors.countryId = 'You must choose at least one country for your activity';
    }
    return errors;
}

export default function CreateActivity(){

    const countries = useSelector(s => s.countries);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [countryId, setCountryId] = useState([]);
    const [order, setOrder] = useState('');

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]); 

    const [activityPost, setActivityPost] = useState({
        name: '',
        difficulty: '',
        duration: '',
        seasons: []
    });

    // Esta función me ordena los países que están en el select, una vez que le hago click.
    function handleClick(){
        dispatch(orderCountriesAlphAZ());
        setOrder('Ordered');
    }

    function handleChange(e) {
        if (e.target.name === 'countryId') {
            setCountryId([...countryId, e.target.value]);
        } else if (e.target.name === 'seasons') {
            if (e.target.checked) {
                setActivityPost({
                    ...activityPost,
                    seasons: activityPost.seasons.concat(e.target.value)
                }) 
            } else if (!e.target.checked) {
                activityPost.seasons && setActivityPost({
                    ...activityPost,
                    seasons: activityPost.seasons.filter(s => s !== e.target.value)
                }) 
            }
        } else {
            setActivityPost({
                ...activityPost, 
                [e.target.name]: e.target.value
            });
        }
        setErrors(validate({
            ...activityPost,
            [e.target.name]: e.target.value
        }, countryId));
    }


    // Hice el axios acá porque en las actions no me funcionaba, no sé por qué.
    async function handleSubmit (e) {
        e.preventDefault();
        const completedActivity = {...activityPost, countryId: countryId};
        if (!Object.keys(errors).length) {
            const post = await axios.post('/activity', completedActivity)
            alert('Your activity was created');
            setActivityPost({
                name: '',
                difficulty: '',
                duration: '',
                seasons: ''
            });
            setCountryId([]);
        } else {
            alert('Your activity is missing fields.')
        }
    }

    function handleDeleteClick(c) {
        setCountryId(countryId.filter(cR => cR !== c))
    }

    return (
        <div className={styles.body}>
            <NavBar />
            <h1 className={styles.createAct}>CREATE YOUR OWN ACTIVITY</h1>

            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.fields}>
                <label className={styles.labels}>Country: </label>
                    <select name="countryId" onChange={e => handleChange(e)} onClick={handleClick}>
                        <option>- Select Country -</option>
                        {countries.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                    {
                        errors.countryId && (
                        <p className={styles.err}>{errors.countryId}</p>
                        )
                    }
                </div>
                <div className={styles.fields}>
                    <label className={styles.labels}>Name: </label>
                    <input 
                        type="text"
                        value={activityPost.name}
                        name="name"
                        onChange={e => handleChange(e)}
                    />
                    {
                        errors.name && (
                        <p className={styles.err}>{errors.name}</p>
                        )
                    }
                </div>
                <div className={styles.fields}>
                    <label className={styles.labels}>Difficulty: </label>
                    <select name="difficulty" value={activityPost.difficulty} onChange={e => handleChange(e)}>
                        <option>- Set Difficulty -</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {
                        errors.difficulty && (
                        <p className={styles.err}>{errors.difficulty}</p>
                        )
                    }
                </div>
                <div className={styles.fields}>
                    <label className={styles.labels}>Duration (in hours): </label>
                    <input
                        type="text"    
                        value={activityPost.duration}
                        name="duration"
                        onChange={e => handleChange(e)}
                    />
                    {
                        errors.duration && (
                        <p className={styles.err}>{errors.duration}</p>
                        )
                    }
                </div>
                <div className={styles.fields}>
                    <label className={styles.labels}>Seasons: </label>
                    <label>
                        <input
                            type="checkbox"
                            name="seasons"
                            value="Summer"    
                            onChange={(e) => handleChange(e)}
                        />
                        Summer
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="seasons"
                            value="Fall"    
                            onChange={(e) => handleChange(e)}
                        />
                        Fall
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="seasons"
                            value="Winter"    
                            onChange={(e) => handleChange(e)}
                        />
                        Winter
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="seasons"
                            value="Spring"    
                            onChange={(e) => handleChange(e)}
                        />
                        Spring
                    </label>
                    {
                        errors.seasons && (
                        <p className={styles.err}>{errors.seasons}</p>
                        )
                    }
                </div>

                <input className={styles.btn} type="submit" value="Create Activity" />
            </form>
            {
                countryId.map(c => 
                    <div className={styles.idCountry}>
                        <p>{c}</p>
                        <button className={styles.idButton} onClick={() => handleDeleteClick(c)}>X</button>
                    </div>
                    )
            }
        </div>
    )
}
