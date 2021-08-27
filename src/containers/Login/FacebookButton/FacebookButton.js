import React from 'react';
import './FacebookButton.css';
import FacebookLogo from './FacebookLogo/FacebookLogo';

const facebook = (props) => {
    return (
        <div className="button-wrapper-facebook" onClick={props.clicked}>
            <button>
                <FacebookLogo />
            </button>
        </div>
    );
}

export default facebook;