import React from 'react';
import { Link } from 'react-router-dom';
//import { convertDate } from '../../../utils/dates'
import './Project.css';

const project = (props) => {
    return (
        <div className='project-card-wrapper card-wrapper'>
            <Link to={"/app/project/" + props.id} ><div id='item-title' className='project-item'>{props.title}</div></Link>
            <div id='item-description' className='project-item'>{props.description}</div>
            <div className="horizontal-separaton"></div>
            <div id='item-teams' className='project-item'>{props.teams} {props.teams > 1 ? 'equipos' : 'equipo'}</div>
            <div id="item-badge" className="badge-wrapper">
                <div className={props.owner ? "badge owner" : "badge member"}>{props.owner ? 'Dueño' : 'Miembro'}</div>
            </div>
            {/*<div id='item-date' className='task-item'>{convertDate(props.date)}</div>*/}
        </div>
    );
}

export default project;