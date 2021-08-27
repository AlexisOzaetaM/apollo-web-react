import React from 'react';
import MainToolbar from '../../containers/MainToolbar/MainToolbar';

import './Toolbar.css';

const toolbar = (props) => {
    return (
        <div className="container-toolbar">
            <div className='page-toolbar-wrapper'>{props.children}</div>
            <MainToolbar />
        </div>
    );
}

export default toolbar;