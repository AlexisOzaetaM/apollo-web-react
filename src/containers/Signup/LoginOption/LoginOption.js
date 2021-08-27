import React from 'react';
import { Link } from 'react-router-dom';

import './LoginOption.css'

const loginOption = (props) => {
    return(
        <div>
            <Link to="/" ><span className="link-option">¿Ya tienes una cuenta?</span></Link>
        </div>
    );
}

export default loginOption;