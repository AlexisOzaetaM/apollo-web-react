import React, { Component } from 'react'
import { connect } from 'react-redux';

import './ProjectList.css'

class ProjectList extends Component {

    render() {
        let projectsList = null;


        return (
            <div>
                {projectsList}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        myProjects: state.project.myProjects
    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);

/*
const ListProjects = props =>(
        <ul className="list-projects">
            <li><a href="/" className="paperPlane-icon">Proyectos</a></li>
            <li>Proyecto 1</li>
            <li>Proyecto 2</li>
        </ul>
);
export default ListProjects;
*/