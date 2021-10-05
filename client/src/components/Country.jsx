import React from "react";

export default function Country({id, name, flag, region}) {
    return (
        <div key={id}>
            <p>{name}</p>
            <img src={flag}/>
            <p>{region}</p>
        </div>
    )
}