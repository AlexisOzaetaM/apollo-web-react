import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

const modal = (props) => {
    const animation = !props.show ? ' modal-out-animation' : '';

    return (
        <div className={'container-modal ' + (props.show ? 'show-modal' : '')}>
            <Backdrop
                show={props.show}
                clicked={props.closeModal}
            />
            <div className={'wrapper-modal' + animation}>
                {props.children}
            </div>
        </div>
    );
};

export default modal;