import React from 'react';
import Card from '../../Card/Card';
import './User.css';

const user = (props) => {
    let deleteButton = props.isDefault
        ? null
        : <div className="user-delete" onClick={props.onDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" /></svg>
        </div>

    return (
        <Card>
            <div className='user-card-wrapper'>
                <div className="user-username">
                    {props.username}
                </div>
                {deleteButton}
            </div>
        </Card>
    );
}

export default user;