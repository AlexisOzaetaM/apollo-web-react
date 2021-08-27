import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalTypes from '../../constants/modals';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Toolbar from '../../components/Toolbar/Toolbar';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import Notification from '../../components/Notification/Notification';
//import Spinner from '../../components/UI/Spinner/Spinner';
import Loading from '../../components/Loading/Loading';
import TaskList from '../TaskList/TaskList';
//import TaskBoard from '../TaskBoard/TaskBoard';

import './Project.css';


class Project extends Component {
    state = {
        displayOptionsMenu: false,
        data: {
            idProject: null
        }
    }

    showOptionsMenuHandler = () => {
        this.setState({ displayOptionsMenu: !this.state.displayOptionsMenu })
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.setState({ data: { idProject: id } })
        this.props.onGetProject(id)
    }

    componentWillUnmount() {
        this.props.onCleanProjectState()
    }

    render() {
        let redirectToMyProjects = this.props.deleted ? <Redirect from="/app/my-projects" to="/app/home" /> : null;

        let notification = this.props.error
            ? <Notification notificationStyle='error' message={this.props.error} />
            : null;

        let toolbar = <div className="container-project-toolbar">
            <Toolbar>
                <div className="project-toolbar-wrapper">
                    <ToggleButton clicked={() => this.props.onCollapseLateralMenu()} />
                    <div className="project-toolbar-title">{this.props.projectName}</div>
                    <div className="project-toolbar-options-wrapper dropdown" onClick={this.showOptionsMenuHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" /></svg>
                        {this.state.displayOptionsMenu
                            ? (<ul className='options-dropdown-menu-wrapper page-options'>
                                <li onClick={() => this.props.onShowModal(modalTypes.EDIT_PROJECT_MODAL, this.state.data)}>Editar</li>
                                <li onClick={() => this.props.onShowModal(modalTypes.TEAMS_MODAL, this.state.data)}>Equipos</li>
                                <li onClick={() => this.props.onShowModal(modalTypes.NEW_TEAM_MODAL, this.state.data)}>Crear equipo</li>
                                <li onClick={() => this.props.onShowModal(modalTypes.LEVELS_MODAL, this.state.data)}>Roles</li>
                                <li onClick={() => this.props.onShowModal(modalTypes.NEW_LEVEL_MODAL, this.state.data)}>Crear rol</li>
                                <li onClick={() => this.props.onDeleteProject(this.state.data.idProject)}>Eliminar</li>
                            </ul>)
                            : null}
                    </div>
                </div>
            </Toolbar>
        </div>

        let tasksView = this.state.data.idProject === null
            ? <Loading />
            : <TaskList idProject={this.state.data.idProject} />

        return (
            <div className="container-project-page">
                {redirectToMyProjects}
                {notification}
                {toolbar}
                {tasksView}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectName: state.project.currentProject ? state.project.currentProject.name : 'Cargando...',
        deleted: state.project.deleted,
        error: state.project.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProject: (idProject) => dispatch(actions.getProject(idProject)),
        onCollapseLateralMenu: () => dispatch(actions.collapseLateralMenu()),
        onCleanProjectState: () => dispatch(actions.cleanProject()),
        onShowModal: (modalType, modalData) => dispatch(actions.showModal(modalType, modalData)),
        onDeleteProject: (idProject) => dispatch(actions.deleteProject(idProject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);