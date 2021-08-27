import React from 'react';
import './Button.css';

const button = (props) => {
    let classes = props.isPrimary ? 'button-wrapper primary' : 'button-wrapper secondary'

    return (
        <div className={classes}>
            <button onClick={props.clicked}>{props.buttonText}</button>
        </div>
    );
}

export default button;