import React from 'react';
import './TextArea.css';

const TextA = (props) => {
    return (
        <div className="container-input">
            <div className='textA-wrapper'>
                <textarea placeholder={props.hint} className="area" value={props.value} onChange={props.changed} />
            </div>
        </div>
    );
}
export default TextA;