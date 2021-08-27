import React from 'react';

import './SignupButton.css'

const signupButton = (props) => {
    return (
        <div className="button-wrapper-signup">
            <button type="submit" className="button-signup" onClick={props.clicked}></button>
        </div>
    );
}

export default signupButton;