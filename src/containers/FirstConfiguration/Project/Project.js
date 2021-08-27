import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/Input/Input';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/Button/Button';
import Loading from '../../../components/Loading/Loading';

import './Project.css';

class Project extends Component {
    state = {
        projectName: '',
        description: '',
        startDate: '',
        dueDate: '',
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
        this.props.onsaveProject(this.state.projectName, this.state.description, this.state.dueDate, this.state.startDate, this.state.teamName);
    }

    render() {
        let saveButton = !this.props.success
            ? <Button buttonText="Guardar" isPrimary={true} />
            : <Button isPrimary={false} buttonText='Siguiente' clicked={this.props.onNext} />;

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
                    <Button isPrimary={false} buttonText='Regresar' clicked={this.props.onBack} />
                    {saveButton}
                </div>
            </form>;

        return (
            <div className="container-project" >
                <div className="form-wrapper-project">
                    {loading}
                </div>
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
        onsaveProject: (projectName, description, dueDate, startDate, teamName) => dispatch(actions.saveProject(projectName, description, dueDate, startDate, teamName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);