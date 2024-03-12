import React from 'react';

const Card = function({name, image}){
    return (
        <img
            alt={name}
            src={image}
        />
    );
}

export default Card;