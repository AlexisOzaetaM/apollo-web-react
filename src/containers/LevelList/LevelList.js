import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/actions/index';
import Button from '../../components/Button/Button';
import Level from '../../components/Lists/Level/Level'
import * as modalTypes from '../../constants/modals'

import './LevelList.css'

class LevelLis extends Component {
    state = {
        modalData: {
            idProject: 0,
            idLevel: 0
        }
    };

    deleteLevelSelectedHandler = (idLevel, idProject) => {
        this.props.onDeleteLevel(idLevel, idProject);
    }

    componentDidMount() {
        this.props.onGetLevels(this.props.idProject);
    }

    render() {
        if (this.props.delete) {
            this.props.onGetLevels(this.props.idProject);
        }

        let List = null;
        if (this.props.levelsList !== []) {
            List = (
                <div className='cards-container'>
                    {this.props.levelsList.map((level, index) => {
                        return <Level
                            key={level.value}
                            onDelete={() => this.deleteLevelSelectedHandler(level.value)}
                            onEdit={() => this.props.onShowModal(modalTypes.EDIT_LEVEL_MODAL, {
                                idLevel: level.value,
                                idProject: this.props.idProject
                            })}
                            levelName={level.label}
                            isDefault={index < 4}
                        />
                    })}
                </div>
            )
        }

        let notification = this.props.error
            ? <Notification notificationStyle='error' message={this.props.error} />
            : null;

        let loading = this.props.loading
            ? <Loading />
            : <form name="project-form" id="project-form" onSubmit={this.submitHandler}>
                <span className="form-title">Roles del proyecto</span>
                <span className="instruc">Estos son los roles de tu proyecto.</span>
                <span>{JSON.stringify(this.props.levelList)}</span>
                <span className="form-instructions queso">M&aacute;s adelante podr&aacute;s agregar a los miembros de tu equipo.</span>
                {List}
                <div className="InlineButtons ">
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
        levelsList: state.level.levelsList,
        delete: state.level.delete
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowModal: (modalType, modalData) => dispatch(actions.showModal(modalType, modalData)),
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onGetLevels: (idProject) => dispatch(actions.getLevels(idProject)),
        onDeleteLevel: (idLevel, idProject) => dispatch(actions.deleteLevel(idLevel, idProject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelLis);