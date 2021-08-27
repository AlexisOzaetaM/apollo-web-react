import React from 'react';
import './Comment.css';

const comment = (props) => {
    return (
        <div className="container-comment">
            <div className='comment-wrapper'>
                <span className="user-comment-item">&nbsp;&nbsp;&nbsp;&nbsp;{props.user}</span>
                <span className="date-comment-item">&nbsp;&nbsp;&nbsp;&nbsp;{props.date}</span>
                <div className="comment-comment-item">&nbsp;&nbsp;&nbsp;&nbsp;{props.comment}</div>
            </div>
        </div>
    );
}

export default comment;