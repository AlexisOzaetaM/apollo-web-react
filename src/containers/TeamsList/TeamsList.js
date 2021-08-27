import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalTypes from '../../constants/modals'
import * as actions from '../../store/actions/index';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import Team from '../../components/Lists/Team/Team'

import './TeamsList.css'

class TeamList extends Component {
    state = {
        data: {

        }
    }

    deleteTeamSelectedHandler = (idTeam) => {
        this.props.onDeleteTeam(idTeam)
    }

    componentDidMount() {
        this.props.onGetTeams(this.props.idProject)
    }

    render() {
        let List = null;
        if (this.props.teamsList !== []) {
            List = (
                <div className='cards-container'>
                    {this.props.teamsList.map((team, index) => {
                        return <Team
                            key={team.value}
                            onDelete={() => this.deleteTeamSelectedHandler(team.value)}
                            onEdit={() => this.props.onShowModal(modalTypes.EDIT_TEAM_MODAL, {idTeam: team.value, idProject: this.props.idProject})}
                            team={team.data}
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
            : <form name="teams-form" id="teams-form" onSubmit={this.submitHandler}>
                <span className="form-title">Equipos</span>
                <span className="form-instructions">Estos son los equipos dentro de tu proyecto, aquí puedes eliminarlos o editarlos.</span>
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
}

const mapStateToProps = state => {
    return {
        loading: state.team.loading,
        error: state.team.error,
        success: state.team.success,
        teamsList: state.team.teamsList,
        delete: state.team.delete
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowModal: (modalType, modalData) => dispatch(actions.showModal(modalType, modalData)),
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onGetTeams: (idProject) => dispatch(actions.getTeams(idProject)),
        onDeleteTeam: (idTeam) => dispatch(actions.deleteTeam(idTeam))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);