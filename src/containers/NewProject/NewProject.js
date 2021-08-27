import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewProject.css'
import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/actions/index';
import * as modalTypes from '../../constants/modals';
import Button from '../../components/Button/Button';

class NewProject extends Component {
    state = {
        projectName: '',
        description: '',
        dueDate: '',
        startDate: '',
        teamName: ''
    };

    projectNameChangedHandler = (event) => {
        this.setState({ projectName: event.target.value })
    }

    descriptionChangedHandler = (event) => {
        this.setState({ description: event.target.value })
    }

    dueDateChangedHandler = (event) => {
        this.setState({ dueDate: event.target.value })
    }

    startDateChangedHandler = (event) => {
        this.setState({ startDate: event.target.value })
    }

    teamNameChangedHandler = (event) => {
        this.setState({ teamName: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSaveProject(this.state.projectName, this.state.description, this.state.dueDate, this.state.startDate, this.state.teamName);
    }

    componentDidMount() {
        this.props.onCleanProjectState()
    }

    componentWillUnmount() {
        this.props.onCleanProjectState()
    }

    render() {
        let notification = this.props.success
            ? <Notification notificationStyle='success' message={this.props.success} />
            : this.props.error
                ? <Notification notificationStyle='error' message={this.props.error} />
                : null;

        let loading = this.props.loading
            ? <Loading />
            : <form name="project-form" id="project-form" onSubmit={this.submitHandler}>
                <span className="form-title">Nuevo proyecto</span>
                <Input
                    inputType='text'
                    hint='Teclea el nombre de tu proyecto'
                    required={true}
                    changed={this.projectNameChangedHandler}
                />
                <Input
                    inputType='text'
                    hint='Escribe una descripci&oacute;n'
                    required={true}
                    changed={this.descriptionChangedHandler}
                />
                <Input
                    title="Fecha de inicio"
                    inputType='date'
                    hint='Elige la fecha de inicio'
                    required={true}
                    changed={this.startDateChangedHandler}
                />
                <Input
                    title="Fecha de finalización"
                    inputType='date'
                    hint='Elige la fecha de finalizaci&oacute;n'
                    required={true}
                    changed={this.dueDateChangedHandler}
                />
                <Input
                    inputType='text'
                    hint='Ponle un nombre al equipo'
                    required={false}
                    changed={this.teamNameChangedHandler}
                />
                <span className="form-instructions">M&aacute;s adelante podr&aacute;s agregar a los miembros de tu equipo.</span>
                <div className="InlineButtons">
                    <Button isPrimary={false} buttonText='Cancelar' clicked={() => this.props.onHideModal(modalTypes.NON_MODAL)} />
                    <Button isPrimary={true} buttonText='Guardar' />
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
        success: state.project.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveProject: (projectName, description, dueDate, teamName) => dispatch(actions.saveProject(projectName, description, dueDate, teamName)),
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onCleanProjectState: () => dispatch(actions.cleanProject())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);