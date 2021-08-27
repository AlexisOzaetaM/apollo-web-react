import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewLevel.css'
import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/actions/index';
import Button from '../../components/Button/Button';
import * as modalTypes from '../../constants/modals'

class NewLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rolName: '',
            transactions: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]
        }

        this.onCheckChangeHandler = this.onCheckChangeHandler.bind(this);
    }

    onCheckChangeHandler(e) {
        let transactions = this.state.transactions
        transactions[e.target.value] = e.target.checked ? 1 : 0
        this.setState({ transactions: transactions })
    }

    rolNameChangedHandler = (event) => {
        this.setState({ rolName: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSaveLevel(this.state.rolName, this.props.idProject, this.state.transactions);
    }

    componentWillUnmount() {
        this.props.onCleanLevelState()
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
                <span className="form-title">Crea un nuevo rol</span>
                <Input
                    inputType='text'
                    hint='Teclea el nombre del rol'
                    required={true}
                    changed={this.rolNameChangedHandler}
                />
                <span className="instructions">Elige los permisos que le otorgaras.</span>
                <span className="module-title">Proyectos:</span>
                <div className="module-checkbox-wrapper">
                    <input type="checkbox" name="project_edit" id="proEdit" value="9" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="proEdit" className="checkmark"></label>
                    <label className="transaction-title">Editar</label>
                    <br />
                    <input type="checkbox" name="project_delete" id="proDelete" value="10" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="proDelete" className="checkmark"></label>
                    <label className="transaction-title">Eliminar</label>
                </div>
                <span className="module-title">Roles:</span>
                <div className="module-checkbox-wrapper">
                    <input type="checkbox" name="rol_create" id="rol_create" value="18" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="rol_create" className="checkmark"></label>
                    <label className="transaction-title">Crear</label>
                    <br />
                    <input type="checkbox" name="rol_edit" id="rol_edit" value="19" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="rol_edit" className="checkmark"></label>
                    <label className="transaction-title">Editar</label>
                    <br />
                    <input type="checkbox" name="rol_delete" id="rol_delete" value="20" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="rol_delete" className="checkmark"></label>
                    <label className="transaction-title">Eliminar</label>
                </div>
                <span className="module-title">Equipos:</span>
                <div className="module-checkbox-wrapper">
                    <input type="checkbox" name="team_create" id="team_create" value="12" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="team_create" className="checkmark"></label>
                    <label className="transaction-title">Crear</label>
                    <br />
                    <input type="checkbox" name="team_edit" id="team_edit" value="13" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="team_edit" className="checkmark"></label>
                    <label className="transaction-title">Editar</label>
                    <br />
                    <input type="checkbox" name="team_delete" id="team_delete" value="14" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="team_delete" className="checkmark"></label>
                    <label className="transaction-title">Eliminar</label>
                    <br />
                    <input type="checkbox" name="team_addme" id="team_addme" value="15" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="team_addme" className="checkmark"></label>
                    <label className="transaction-title">Añadir miembros</label>
                    <br />
                    <input type="checkbox" name="team_deleteme" id="team_deleteme" value="16" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="team_deleteme" className="checkmark"></label>
                    <label className="transaction-title">Eliminar miembros</label>
                </div>
                <span className="module-title">Tareas:</span>
                <div className="module-checkbox-wrapper">
                    <input type="checkbox" name="task_create" id="task_create" value="22" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="task_create" className="checkmark"></label>
                    <label className="transaction-title">Crear</label>
                    <br />
                    <input type="checkbox" name="task_edit" id="task_edit" value="23" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="task_edit" className="checkmark"></label>
                    <label className="transaction-title">Editar</label>
                    <br />
                    <input type="checkbox" name="task_delete" id="task_delete" value="24" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="task_delete" className="checkmark"></label>
                    <label className="transaction-title">Eliminar</label>
                    <br />
                    <input type="checkbox" name="task_comment" id="task_comment" value="26" hidden onChange={this.onCheckChangeHandler} />
                    <label htmlFor="task_comment" className="checkmark"></label>
                    <label className="transaction-title">Comentar</label>
                </div>
                <div className="InlineButtons">
                    <Button isPrimary={false} buttonText='Cancelar' clicked={() => this.props.onHideModal(modalTypes.NON_MODAL)} />
                    <Button buttonText="Guardar" isPrimary={true} />
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
        loading: state.level.loading,
        error: state.level.error,
        success: state.level.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onSaveLevel: (rolName, idProject, transactions) => dispatch(actions.saveLevel(rolName, idProject, transactions)),
        onCleanLevelState: () => dispatch(actions.cleanLevelState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLevel);