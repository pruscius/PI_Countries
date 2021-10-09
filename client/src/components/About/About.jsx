import React from "react";
import { Link } from 'react-router-dom';

export default function About(){
    return (
        <>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <h2>About</h2>
            <p>This is an individual project developed by Andrés Frank, for the puropse of evaluation 
                from the teaching instructors at Henry School of Web Development.
            </p>
        </>
    )
}