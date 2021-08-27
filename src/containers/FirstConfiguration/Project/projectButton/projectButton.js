import React from 'react';

import './projectButton.css'

const projectButton = (props) => {
    return (
        <div className="button-wrapper-project">
            <button type="submit" className="button-project" onClick={props.clicked}></button>
        </div>
    );
}

export default projectButton;
