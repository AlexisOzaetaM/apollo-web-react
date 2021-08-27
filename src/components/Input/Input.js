import React from 'react';
import './Input.css';

const input = (props) => {
    let title = props.title ? <span className="input-title">{props.title}</span> : null;

    return (
        <div className="container-input">
            {title}
            <div className='input-wrapper'>
                <input type={props.inputType} placeholder={props.hint} onChange={props.changed} required={props.required} value={props.value} />
            </div>
        </div>
    );
}

export default input;