import React, { Component } from 'react';
import Spinner from '../UI/Spinner/Spinner';

class Loading extends Component {
    render() {
        return (
            <div className="loading-wrapper">
                <Spinner />
            </div>
        );
    }
};

export default Loading;