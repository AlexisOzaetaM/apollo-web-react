import React from 'react';
import './GoogleButton.css';
import GoogleLogo from '../../../assets/google-g.svg';

const google = (props) => {
    return (
        <div className="button-wrapper-google" onClick={props.clicked}>
            <button>
                <img src={GoogleLogo} alt="Google Logo"/>
            </button>
        </div>
    );
}

export default google;