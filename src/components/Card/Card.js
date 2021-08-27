import React from 'react';
import './Card.css';

const card = (props) => {
    return (
        <div className="card-wrapper">
            {props.children}
        </div>
    );
}

export default card;