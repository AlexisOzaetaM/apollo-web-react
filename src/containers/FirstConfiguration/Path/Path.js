import React from 'react';
import Circle from './Circle/Circle';

import './Path.css';

const path = (props) => {
    return (
        <div className="path-wrapper">
            <Circle
                classes="circle first-circle"
                isFill={1 <= props.currentStep ? true : false} />
            <Circle
                classes="circle second-circle"
                isFill={2 <= props.currentStep ? true : false} />
            <Circle
                classes="circle third-circle"
                isFill={3 <= props.currentStep ? true : false} />
        </div>
    );
};

export default path;