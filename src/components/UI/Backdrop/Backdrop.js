import React from 'react';

import './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className='container-backdrop' onClick={props.clicked}></div> : null
);

export default backdrop;