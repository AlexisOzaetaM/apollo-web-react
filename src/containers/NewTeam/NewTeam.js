import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import Select from 'react-select';
import * as actions from '../../store/actions/index';
import * as modalTypes from '../../constants/modals';
import Button from '../../components/Button/Button';
import { isUserDuplicated } from '../../utils/objects';
import { removeUserFromArray } from '../../utils/arrays';
import User from '../../components/Lists/User/User';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';

import './NewTeam.css'

class NewProject extends Component {
    state = {
        teamName: '',
        usersSelected: [{ value: this.props.currentUserId, label: this.props.currentUsername }]
    };

    teamNameChangedHandler = (event) => {
        this.setState({ teamName: event.target.value })
    }

    searchUsernameChangedHandler = (event) => {
        if (event !== '') this.props.onSearchUsersLike(event);
    }

    selectUsernameChangedHandler = (optionSelected) => {
        if (optionSelected.lebel !== '') {
            let users = this.state.usersSelected
            if (!isUserDuplicated(users, optionSelected)) {
                users.push(optionSelected)
                this.setState({ usersSelected: users })
            }
        }
    }

    deleteUserSelectedHandler = index => {
        let users = this.state.usersSelected
        this.setState({ usersSelected: removeUserFromArray(users, index) })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSaveTeam(this.state.teamName, this.props.idProject, this.state.usersSelected.map((element) => { return element.value }))
    }

    componentDidMount() {
        this.props.onCleanTeamState()
    }

    componentWillUnmount() {
        this.props.onCleanTeamState()
    }

    render() {
        let usersList = null;
        if (this.state.usersSelected !== []) {
            usersList = (
                <div className='cards-container'>
                    {this.state.usersSelected.map((user, index) => {
                        return <User
                            key={user.value}
                            onDelete={() => this.deleteUserSelectedHandler(user.value)}
                            username={user.label}
                        />
                    })}
                </div>
            )
        }

        let notification = this.props.success
            ? <Notification notificationStyle='success' message={this.props.success} />
            : this.props.error
                ? <Notification notificationStyle='error' message={this.props.error} />
                : null;

        let loading = this.props.loading
            ? <Loading />
            : <form name="new-team-form" id="new-team-form" onSubmit={this.submitHandler}>
                <span className="form-title">Crear equipo</span>
                <span className="form-instructions queso">¿Necesitas un equipo nuevo? aquí podrás crear uno y añadir a los miembros que lo integrarán.</span>
                <Input
                    inputType='text'
                    hint='Ponle un nombre a tu equipo'
                    required={true}
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
            <div className="new-team-container">
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
        searchOptions: state.user.searchOptions,
        currentUserId: state.user.userData.id,
        currentUsername: state.user.userData.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onSaveTeam: (teamName, idProject, teamMembers) => dispatch(actions.saveNewTeam(teamName, idProject, teamMembers)),
        onSearchUsersLike: (username) => dispatch(actions.GetUsernamesLike(username)),
        onCleanTeamState: () => dispatch(actions.cleanTeamState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);