import React from 'react';
import { convertDate } from '../../../utils/dates'
import './Task.css';

const team = (props) => {
    return (
        <div className='task-row-wrapper' onClick={props.onClick}>
            <div id='item-title' className='task-item'>{props.title}</div>
            <div id='item-user' className='task-item'>{props.user}</div>
            <div id='item-state' className='task-item'>{props.state}</div>
            <div id='item-team' className='task-item'>{props.team}</div>
            <div id='item-date' className='task-item'>{convertDate(props.date)}</div>
        </div>
    );
}

export default team;