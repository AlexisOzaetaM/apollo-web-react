import React from 'react';

import './LoginButton.css'

const loginButton = (props) => {
    return (
        <div className="button-wrapper-login">
            <button type="submit" className="button-login" onClick={props.clicked}></button>
        </div>
    );
}

export default loginButton;