import React from 'react';
import { Link } from 'react-router-dom';

import './SignupOption.css'

const signupOption = (props) => {
    return(
        <div>
            <Link to="/signup" ><span className="link-option">¿Aún no tienes una cuenta?</span></Link>
        </div>
    );
}

export default signupOption;