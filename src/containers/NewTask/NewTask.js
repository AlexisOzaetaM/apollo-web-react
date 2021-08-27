import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import TextA from '../../components/TextArea/TextArea'
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/actions/index';
import Button from '../../components/Button/Button';
import * as modalTypes from '../../constants/modals'
import Select from 'react-select';

import './NewTask.css'

class EditLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            dueDate: '',
            description: "",
            project: null,
            equipo: true,
            usuario: true,
            idTeam: null,
            idUsuario: null,
            stateList: [
                { value: 1, label: 'Abierto' }, 
                { value: 2, label: 'Proceso' },
                { value: 3, label: 'Completada' }, 
                { value: 4, label: 'Cancelada' }
            ],
            state: 1
        }
    }
    selectProjectChangedHandler = (optionSelected) => {
        if (optionSelected.label !== '') {
            this.setState({
                equipo: false,
                project: optionSelected.value
            })
            this.props.onGetProjectTeams(optionSelected.value);
        }
    }

    selectTeamChangedHandler = (optionSelected) => {
        if (optionSelected.label !== '') {
            this.setState({
                usuario: false,
                idTeam: optionSelected.value
            })
            this.props.onGetTeamUsers(optionSelected.value)
        }
    }
    selectUserChangedHandler = (optionSelected) => {
        if (optionSelected.label !== '') {
            this.setState({
                idUsuario: optionSelected.value
            })

        }
    }
    selectStateChangedHandler = (optionSelected) => {
        if (optionSelected.label !== '') {
            this.setState({
                state: optionSelected.value
            })
        }
    }
    dueDateChangedHandler = (event) => {
        this.setState({ dueDate: event.target.value })
    }
    rolNameChangedHandler = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    descriptionChangedHandler = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.idTeam !== null) {
            this.props.onSaveNewTask(this.state.project, this.state.idTeam, this.state.idUsuario, this.state.title, this.state.description, this.state.dueDate, this.state.state)
        } else {
            ////equipo vacio
        }
    }
    componentDidMount() {
        this.props.onGetUserProjects();
    }

    render() {
        let notification = (this.props.success)
            ? <Notification notificationStyle='success' message={this.props.success} />
            : (this.props.error)
                ? <Notification notificationStyle='error' message={this.props.error} />
                : (this.props.errorTeam)
                    ? <Notification notificationStyle='error' message={this.props.errorTeam} />
                    :
                    (this.props.errorTask)
                        ? <Notification notificationStyle='error' message={this.props.errorTask} />
                        : null;

        let loading = (this.props.loading)
            ? <Loading />
            : (this.props.loadingTask)
                ? <Loading />
                :
                <form name="project-form" id="project-form" onSubmit={this.submitHandler}>
                    <span className="form-title">Nueva Tarea</span>
                    <Input
                        inputType='text'
                        hint='Teclea el titulo de la tarea'
                        required={true}
                        changed={this.rolNameChangedHandler}
                    />
                    <TextA
                        value={this.state.description}
                        changed={this.descriptionChangedHandler}
                        hint='Teclea la  descripci&oacute;n'
                        required={false}
                    />
                    <div className="two-selects-wrapper">
                        <div className="selector">
                            <span >Proyecto</span>
                            <Select
                                className="select-wrapper"
                                onChange={this.selectProjectChangedHandler}
                                options={this.props.userProjects}
                                required={true}
                            />
                        </div>
                        <div className="selector">
                            <span >Equipo</span>
                            <Select
                                className="select-wrapper"
                                onChange={this.selectTeamChangedHandler}
                                isDisabled={this.state.equipo}
                                options={this.props.projectTeams || null}
                            />
                        </div>
                        <div className="selector">
                            <span >Asignar a</span>
                            <Select
                                className="select-wrapper"
                                isDisabled={this.state.usuario}
                                options={this.props.teamUsers || null}
                                onChange={this.selectUserChangedHandler}
                            />
                        </div>
                    </div>
                    <div className="two-selects-wrapper">
                        <div className="selector">
                            <span >Fecha de entrega</span>
                            <Input

                                inputType='date'
                                hint='Elige la fecha de entrega'
                                required={false}
                                changed={this.dueDateChangedHandler}
                            />
                        </div>
                        <div className="selector">
                            <span >Estado</span>
                            <Select
                                className="select-wrapper"
                                options={this.state.stateList}
                                onChange={this.selectStateChangedHandler}
                            />
                        </div>
                    </div>
                    <div className="InlineButtons">
                        <Button isPrimary={false} buttonText='Cancelar' clicked={() => this.props.onHideModal(modalTypes.NON_MODAL)} />
                        <Button buttonText="Crear" isPrimary={true} />
                    </div>
                </form>;
        return (
            <div>
                {notification}
                {loading}
            </div>
        );
    }

};
const mapStateToProps = state => {
    return {
        loading: state.project.loading,
        error: state.project.error,
        userProjects: state.project.userProjects,
        loadingTeam: state.team.loading,
        errorTeam: state.team.error,
        projectTeams: state.team.projectTeams,
        teamUsers: state.team.teamUsers,
        errorTask: state.task.error,
        loadingTask: state.task.loading,
        success: state.task.success

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onGetUserProjects: () => dispatch(actions.getUserProjects()),
        onGetProjectTeams: (idProject) => dispatch(actions.getProjectTeams(idProject)),
        onGetTeamUsers: (idTeam) => dispatch(actions.getTeamUsers(idTeam)),
        onSaveNewTask: (idProject, idTeam, idUser, title, description, date, state) => dispatch(actions.saveNewTask(idProject, idTeam, idUser, title, description, date, state))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLevel);