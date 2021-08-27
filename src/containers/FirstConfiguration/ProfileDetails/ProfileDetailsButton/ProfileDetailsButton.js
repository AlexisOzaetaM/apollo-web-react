import React from 'react';

import './ProfileDetailsButton.css'

const ProfileDetailsButton = (props) => {
    return (
        <div className="button-wrapper-profile-details">
            <button type="submit" className="button-profile-details" disabled={props.isDisabled} onClick={props.clicked}></button>
        </div>
    );
}

export default ProfileDetailsButton;