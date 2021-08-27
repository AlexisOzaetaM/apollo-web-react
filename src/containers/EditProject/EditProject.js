import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/actions/index';
import Button from '../../components/Button/Button';
import * as modalTypes from '../../constants/modals'
import { convertDate } from '../../utils/dates'

import './EditProject.css'

class EditProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idProject: null,
            projectName: '',
            description: '',
            dueDate: '',
            startDate: '',
            teamName: ''
        }
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onUpdateProject(this.props.idProject, this.state.projectName, this.state.description, this.state.dueDate, this.state.startDate, this.state.teamName);
    }

    convertDate = rowDate => {
        let auxDate = new Date(rowDate)
        return [
            auxDate.getDay(),
            auxDate.getMonth(),
            auxDate.getFullYear()
        ].join('/')
    }

    componentDidMount() {
        this.setState({
            projectName: this.props.project.name,
            description: this.props.project.description,
            dueDate: convertDate(this.props.project.due_date),
            startDate: convertDate(this.props.project.start_date)
        })
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
                <span className="form-title">Editar proyecto</span>
                <span className="form-instructions">Aquí podrás cambiar la información principal de tu proyecto.</span>
                <Input
                    title="Nombre del proyecto"
                    inputType='text'
                    value={this.state.projectName}
                    required={true}
                    changed={this.projectNameChangedHandler}
                />
                <Input
                    title="Descripci&oacute;n"
                    inputType='text'
                    value={this.state.description}
                    required={true}
                    changed={this.descriptionChangedHandler}
                />
                <Input
                    title="Fecha de inicio"
                    inputType='date'
                    value={this.state.startDate}
                    required={true}
                    changed={this.startDateChangedHandler}
                />
                <Input
                    title="Fecha de finalización"
                    inputType='date'
                    value={this.state.dueDate}
                    required={true}
                    changed={this.dueDateChangedHandler}
                />
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
        success: state.project.success,
        project: state.project.currentProject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateProject: (idProject, projectName, description, dueDate, startDate, teamName) => dispatch(actions.updateProject(idProject, projectName, description, dueDate, startDate, teamName)),
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onCleanProjectState: () => dispatch(actions.cleanProject()),
        onGetProject: (idProject) => dispatch(actions.getProject(idProject)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);