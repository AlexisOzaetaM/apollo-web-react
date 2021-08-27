import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import * as actions from '../../store/actions/index';
import * as modalTypes from '../../constants/modals';
import Modal from '../../components/UI/Modal/Modal';
import NewProjectModal from '../NewProject/NewProject';
import NewTeamModal from '../NewTeam/NewTeam';
import LateralMenu from '../LateralMenu/LateralMenu';
import NewLevelModal from '../NewLevel/NewLevel';
import LevelsModal from '../LevelList/LevelList';
import EditLevelModal from '../EditLevel/EditLevel';
import EditProfileModal from '../EditProfile/EditProfile';
import EditProjectModal from '../EditProject/EditProject';
import EditTeamModal from '../EditTeam/EditTeam';
import TeamsModal from '../TeamsList/TeamsList';
import ProjectPage from '../Project/Project';
import MyProjectsPage from '../MyProjects/MyProjects';
import HomePage from '../Home/Home'
import NewTaskModal from '../NewTask/NewTask';
import TaskModal from '../Task/Task';

import './Main.css';

class Main extends Component {
    getModal = (modalType) => {
        switch (modalType) {
            case modalTypes.NEW_PROJECT_MODAL: return <NewProjectModal />;
            case modalTypes.NEW_TASK_MODAL: return  <NewTaskModal />;
            case modalTypes.TASK_MODAL: return <TaskModal taskData={this.props.modal.task} />;
            case modalTypes.EDIT_PROJECT_MODAL: return <EditProjectModal idProject={this.props.modal.idProject}/>;
            case modalTypes.SETTINGS_MODAL: return <EditProfileModal />;
            case modalTypes.EDIT_TEAM_MODAL: return <EditTeamModal idTeam={this.props.modal.idTeam} idProject={this.props.modal.idProject}/>;
            case modalTypes.TEAMS_MODAL: return <TeamsModal idProject={this.props.modal.idProject}/>;
            case modalTypes.NEW_TEAM_MODAL: return <NewTeamModal idProject={this.props.modal.idProject}/>;
            case modalTypes.LEVELS_MODAL: return <LevelsModal idProject={this.props.modal.idProject}/>;
            case modalTypes.EDIT_LEVEL_MODAL: return <EditLevelModal idProject={this.props.modal.idProject} idLevel={this.props.modal.idLevel} />
            case modalTypes.NEW_LEVEL_MODAL: return <NewLevelModal idProject={this.props.modal.idProject}/>;
            default: return null;
        };
    };

    render() {
        let redirectLogin = this.props.logout ? <Redirect to='/' /> : null;

        let isCollapsed = this.props.isCollapsed ? ' collapsed' : '';

        let modal = this.props.modal.show ? this.getModal(this.props.modal.type) : null;
        
        return (
            <div className="container-main">
                {redirectLogin}
                <Modal
                    show={this.props.modal.show}
                    closeModal={() => this.props.onShowModal(modalTypes.NON_MODAL)}>
                    {modal}
                </Modal>
                <div className={'container-lateral-menu' + isCollapsed}>
                    <LateralMenu collapseLateralMenuHandler={() => this.props.onCollapseLateralMenu()}/>
                </div>
                <div className="container-pages">
                    <Switch>
                        <Route path="/app/home" exact component={HomePage} />
                        <Route path="/app/my-projects" exact component={MyProjectsPage} />
                        <Route path="/app/project/:id" exact component={ProjectPage} />
                    </Switch>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        logout: state.login.logout,
        modal: state.modal.modal,
        isCollapsed: state.lateralMenu.isCollapsed,
        project: state.project.currentProject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowModal: (modalType) => dispatch(actions.showModal(modalType)),
        onCollapseLateralMenu: () => dispatch(actions.collapseLateralMenu())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);