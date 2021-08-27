import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as modalTypes from '../../constants/modals';
import Select from 'react-select';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import User from '../../components/Lists/User/User';

import './EditTeam.css';

class NewProject extends Component {
    state = {
        teamName: null
    };

    teamNameChangedHandler = (event) => {
        this.setState({ teamName: event.target.value })
    }

    searchUsernameChangedHandler = (event) => {
        if (event !== '') this.props.onSearchUsersLike(event);
    }

    selectUsernameChangedHandler = (optionSelected) => {
        this.props.onAddTeamMember(optionSelected, this.props.team.id)
    }

    levelChangedHandler = (optionSelected, userId) => {
        this.props.onUpdateUserLevel(this.props.idProject, userId, optionSelected.value)
        //this.props.onAddTeamMember(optionSelected, this.props.team.id)
    }

    deleteUserSelectedHandler = (index, idTeam) => {
        this.props.onDeleteTeamMember(index, idTeam)
    }

    getDefaulLevel = (levels, userId) => {
        const user = this.props.users.filter(user => user.id === userId)
        if (user.length > 0) {
            const level = levels.filter(level => level.value === user[0].userlevel.id)
            return level[0]
        } else
            return levels[2]
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onUpdateTeam(this.state.teamName === null ? this.props.team.name : this.state.teamName, this.props.idTeam)
    }

    componentDidMount() {
        this.props.onGetTeam(this.props.idTeam)
        this.props.onGetLevels(this.props.idProject)
        this.props.onGetUsers(this.props.idProject)
    }

    render() {
        let usersList = null
        if (Object.keys(this.props.team).length !== 0 && Object.keys(this.props.users).length !== 0) {
            usersList = (
                <div className='cards-container'>
                    {this.props.team.users.map((user, index) => {
                        return <div className="card-container">
                            <User
                                key={user.value}
                                onDelete={() => this.deleteUserSelectedHandler(user.value, this.props.team.id)}
                                username={user.label}
                                isDefault={index < 1}
                            />
                            <Select
                                key={index}
                                className="select-wrapper"
                                onChange={(e) => this.levelChangedHandler(e, user.value)}
                                isSearchable={false}
                                options={this.props.levelsList}
                                value={this.getDefaulLevel(this.props.levelsList, user.value)}
                            />
                        </div>
                    })}
                </div>
            )
        }

        let notification = this.props.success
            ? <Notification notificationStyle='success' message={this.props.success} />
            : this.props.error
                ? <Notification notificationStyle='error' message={this.props.error} />
                : this.props.errorUpdateLevel
                    ? <Notification notificationStyle='error' message={this.props.errorUpdateLevel} />
                    : null

        let loading = this.props.loading
            ? <Loading />
            : <form name="project-form" id="project-form" onSubmit={this.submitHandler}>
                <span className="form-title">Editar equipo</span>
                <span className="form-instructions">Aquí puedes cambiar el nombre del equipo, así como agregar o eliminar miembros.</span>
                <Input
                    isDisabled={this.props.saving}
                    inputType='text'
                    value={this.state.teamName || this.props.team.name}
                    required={false}
                    changed={this.teamNameChangedHandler}
                />
                <span>Agrega un miembro</span>
                <Select
                    className="select-wrapper"
                    onChange={this.selectUsernameChangedHandler}
                    onInputChange={this.searchUsernameChangedHandler}
                    options={this.props.searchOptions}
                />
                <span>Miembros del equipo</span>
                {usersList}
                <div className="InlineButtons">
                    <Button isPrimary={false} buttonText='Cancelar' clicked={() => this.props.onHideModal(modalTypes.NON_MODAL)} />
                    <Button isPrimary={true} buttonText='Guardar' />
                </div>
            </form>

        return (
            <div className="">
                {notification}
                {loading}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.team.loading,
        error: state.team.error,
        success: state.team.success,
        team: state.team.teamSelected,
        searchOptions: state.user.searchOptions,
        levelsList: state.level.levelsList,
        users: state.project.usersByProject,
        errorUpdateLevel: state.level.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onGetTeam: (idTeam) => dispatch(actions.getTeam(idTeam)),
        onDeleteTeamMember: (idUser, idTeam) => dispatch(actions.deleteTeamMember(idUser, idTeam)),
        onAddTeamMember: (idUser, idTeam) => dispatch(actions.addTeamMember(idUser, idTeam)),
        onSearchUsersLike: (username) => dispatch(actions.GetUsernamesLike(username)),
        onGetLevels: (idProject) => dispatch(actions.getLevels(idProject)),
        onUpdateUserLevel: (idProject, idUser, idLevel) => dispatch(actions.updateUserLevel(idProject, idUser, idLevel)),
        onUpdateTeam: (teamName, idTeam) => dispatch(actions.updateTeam(teamName, idTeam)),
        onGetUsers: (idProject) => dispatch(actions.getUsersByProject(idProject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
