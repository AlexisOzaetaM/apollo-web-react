import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Loading from '../../components/Loading/Loading';
import ProjectCard from '../../components/Lists/Project/Project';
import ToggleButton from '../../components/ToggleButton/ToggleButton'
import Toolbar from '../../components/Toolbar/Toolbar';

import './MyProjects.css'

class MyProjects extends Component {
    state = {
        displayOptionsMenu: false
    }

    showOptionsMenuHandler = () => {
        this.setState({
            displayOptionsMenu: !this.state.displayOptionsMenu
        })
    }

    componentDidMount() {
        this.props.onGetProjects()
    }

    render() {

        let toolbar = <div className="container-project-toolbar">
            <Toolbar>
                <div className="project-toolbar-wrapper">
                    <ToggleButton clicked={() => this.props.onCollapseLateralMenu()} />
                    <div className="project-toolbar-title">Mis proyectos</div>
                    <div className="project-toolbar-options-wrapper dropdown" onClick={this.showOptionsMenuHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" /></svg>
                        {this.state.displayOptionsMenu
                            ? (<ul className='options-dropdown-menu-wrapper'>
                                <li onClick={() => this.props.onGetProjects()}>Recargar</li>
                            </ul>)
                            : null}
                    </div>
                </div>
            </Toolbar>
        </div>

        let projects = this.props.loading
            ? <Loading />
            : this.props.projects
                ? <div className="my-projects-container">
                    <div className="my-projects-wrapper">
                        {this.props.projects.map((project, index) => {
                            return <ProjectCard
                                key={project.value}
                                id={project.value}
                                title={project.label}
                                description={project.description}
                                teams={project.teams}
                                owner={project.owner}
                            />
                        })}
                    </div>
                </div>
                : <div className="no-projects-message">No tienes proyectos</div>


        return (
            <div>
                {toolbar}
                {projects}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.project.userProjects,
        error: state.project.error,
        loading: state.project.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProjects: () => dispatch(actions.getUserProjects())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);