import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCountries, postActivity } from '../../actions/actions.js';
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
        errors.duration = 'Your activity must have a duration in hours';
    } 
    if(!data.season.length) { // ENUM no es taxativo? o se puede mas de uno?
        errors.season = 'You must set at least one season for your activity';
    } 
    if (!countryId.length) {
        errors.countryId = 'You must choose at least one country for your activity';
    }
    return errors;
}

function CreateActivity({ getCountries, postActivity, countries }){

    const [errors, setErrors] = useState({});
    const [countryId, setCountryId] = useState([]);

    useEffect(() => {
        getCountries();
    }, [getCountries]); 

    const [activityPost, setActivityPost] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: ''
    });

    function handleChange(e) {
        if (e.target.name === 'countryId') {
            setCountryId([...countryId, e.target.value]);
        } else {
            setActivityPost({
                ...activityPost, 
                [e.target.name]: e.target.value});
            console.log(activityPost)
        }
        setErrors(validate({
            ...activityPost,
            [e.target.name]: e.target.value
        }, countryId));
    }

    // function handleCheck(e) {
    //     if (e.target.checked) {
    //         setActivityPost({
    //             ...activityPost,
    //             season: e.target.checked
    //         })
    //     }
    //     console.log(activityPost.season);
    // }

    // function handleSelect(e) {
    //     setActivityPost({
    //         ...activityPost,
    //         difficulty: e.target.value
    //     });
    // };

    async function handleSubmit (e) {
        e.preventDefault();
        const post = await axios.post('http://localhost:3001/activity', activityPost)
        alert('Your activity was created');
        setActivityPost({
            name: '',
            difficulty: '',
            duration: '',
            season: ''
        })
        setCountryId([]);
    }

    function handleDelete(c) {
        setCountryId(countryId.filter(cR => cR !== c))
    }

    return (
        <div>
            <NavBar />
            <h1>Create your own Activity</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                <label>Country: </label>
                    <select name="countryId" onChange={e => handleChange(e)}>
                        <option>- Select Country -</option>
                        {countries.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                    {
                        errors.countryId && (
                        <p className={styles.err}>{errors.countryId}</p>
                        )
                    }
                </div>
                <div>
                    <label>Name: </label>
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
                <div>
                    <label>Difficulty: </label>
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
                <div>
                    <label>Duration (in hours): </label>
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
                <div>
                    <label>Season: </label>
                    <label>
                        <input
                            type="checkbox"
                            name="season"
                            value="Summer"    
                            onChange={(e) => handleChange(e)}
                        />
                        Summer
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="season"
                            value="Fall"    
                            onChange={(e) => handleChange(e)}
                        />
                        Fall
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="season"
                            value="Winter"    
                            onChange={(e) => handleChange(e)}
                        />
                        Winter
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="season"
                            value="Spring"    
                            onChange={(e) => handleChange(e)}
                        />
                        Spring
                    </label>
                    {
                        errors.season && (
                        <p className={styles.err}>{errors.season}</p>
                        )
                    }
                </div>

                <button type="submit">Create Activity</button>
            </form>
            {
                countryId.map(c => 
                    <div>
                        <p>{c}</p>
                        <button onClick={() => handleDelete(c)}>X</button>
                    </div>
                    )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries
    }
}
export default connect (mapStateToProps, { getCountries, postActivity })(CreateActivity);