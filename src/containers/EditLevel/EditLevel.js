import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import * as modalTypes from '../../constants/modals'
import Input from '../../components/Input/Input'
import Notification from '../../components/Notification/Notification'
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'

import './EditLevel.css'

class EditLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rolName: null,
            transactions: [1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1]
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

    isChecked = index => {
        return this.state.transactions[index] === -1 
            ? this.props.levelList[index].checked
            : this.state.transactions[index] === 1
                ? true
                : false
    }

    mergeTransactions = (original, modified) => {
        for(let i = 0; i < modified.length; i++) {
            if (modified[i] === -1)
            modified[i] = original[i].checked ? 1 : 0
        }
        return modified
    }

    submitHandler = (event) => {
        event.preventDefault();
        const transactions = this.mergeTransactions(this.props.levelList, this.state.transactions)
        this.props.onUpdateLevel(this.state.rolName === null ? this.props.levelName : this.state.rolName, this.props.idLevel, transactions);
    }

    componentDidMount() {
        this.props.onGetLevel(this.props.idLevel);
    }

    render() {
        let notification = this.props.success
            ? <Notification notificationStyle='success' message={this.props.success} />
            : this.props.error
                ? <Notification notificationStyle='error' message={this.props.error} />
                : null;

        let loading = this.props.loading || this.props.levelList.length === 0
            ? <Loading />
            : <form name="project-form" id="project-form" onSubmit={this.submitHandler}>
            <span className="form-title">Editar rol</span>
            <Input
                inputType='text'
                hint='Teclea el nombre del rol'
                required={true}
                changed={this.rolNameChangedHandler}
                value={this.state.rolName || this.props.levelName}
            />
            <span className="instructions">Elige los permisos que le otorgaras.</span>
            <span className="module-title">Proyectos:</span>
            <div className="module-checkbox-wrapper">
                <input type="checkbox" name="project_edit" id="proEdit" value="9" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(9)}/>
                <label htmlFor="proEdit" className="checkmark"></label>
                <label className="transaction-title">Editar</label>
                <br />
                <input type="checkbox" name="project_delete" id="proDelete" value="10" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(10)}/>
                <label htmlFor="proDelete" className="checkmark"></label>
                <label className="transaction-title">Eliminar</label>
            </div>
            <span className="module-title">Roles:</span>
            <div className="module-checkbox-wrapper">
                <input type="checkbox" name="rol_create" id="rol_create" value="18" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(18)}/>
                <label htmlFor="rol_create" className="checkmark"></label>
                <label className="transaction-title">Crear</label>
                <br />
                <input type="checkbox" name="rol_edit" id="rol_edit" value="19" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(19)}/>
                <label htmlFor="rol_edit" className="checkmark"></label>
                <label className="transaction-title">Editar</label>
                <br />
                <input type="checkbox" name="rol_delete" id="rol_delete" value="20" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(20)}/>
                <label htmlFor="rol_delete" className="checkmark"></label>
                <label className="transaction-title">Eliminar</label>
            </div>
            <span className="module-title">Equipos:</span>
            <div className="module-checkbox-wrapper">
                <input type="checkbox" name="team_create" id="team_create" value="12" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(12)}/>
                <label htmlFor="team_create" className="checkmark"></label>
                <label className="transaction-title">Crear</label>
                <br />
                <input type="checkbox" name="team_edit" id="team_edit" value="13" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(13)}/>
                <label htmlFor="team_edit" className="checkmark"></label>
                <label className="transaction-title">Editar</label>
                <br />
                <input type="checkbox" name="team_delete" id="team_delete" value="14" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(14)}/>
                <label htmlFor="team_delete" className="checkmark"></label>
                <label className="transaction-title">Eliminar</label>
                <br />
                <input type="checkbox" name="team_addme" id="team_addme" value="15" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(15)}/>
                <label htmlFor="team_addme" className="checkmark"></label>
                <label className="transaction-title">Añadir miembros</label>
                <br />
                <input type="checkbox" name="team_deleteme" id="team_deleteme" value="16" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(16)}/>
                <label htmlFor="team_deleteme" className="checkmark"></label>
                <label className="transaction-title">Eliminar miembros</label>
            </div>
            <span className="module-title">Tareas:</span>
            <div className="module-checkbox-wrapper">
                <input type="checkbox" name="task_create" id="task_create" value="22" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(22)}/>
                <label htmlFor="task_create" className="checkmark"></label>
                <label className="transaction-title">Crear</label>
                <br />
                <input type="checkbox" name="task_edit" id="task_edit" value="23" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(23)}/>
                <label htmlFor="task_edit" className="checkmark"></label>
                <label className="transaction-title">Editar</label>
                <br />
                <input type="checkbox" name="task_delete" id="task_delete" value="24" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(24)}/>
                <label htmlFor="task_delete" className="checkmark"></label>
                <label className="transaction-title">Eliminar</label>
                <br />
                <input type="checkbox" name="task_comment" id="task_comment" value="26" hidden onChange={this.onCheckChangeHandler} defaultChecked={this.isChecked(26)}/>
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
        success: state.level.success,
        levelList: state.level.levelList,
        levelName: state.level.levelName
    };
};

const mapDispatchToDrops = dispatch => {
    return {
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onUpdateLevel: (rolName, idProject, transactions) => dispatch(actions.updateLevel(rolName, idProject, transactions)),
        onGetLevel: (idLevel) => dispatch(actions.getLevel(idLevel)),
    };
};

export default connect(mapStateToProps, mapDispatchToDrops)(EditLevel);