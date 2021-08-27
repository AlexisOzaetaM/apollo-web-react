import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import TaskRow from '../../components/Lists/Task/Task'
import Loading from '../../components/Loading/Loading';
import Filter from '../TaskFilter/TaskFilter'
import { getTaskStateString } from '../../utils/tasks'
import * as modalTypes from '../../constants/modals'

import './TaskList.css'

class TaskList extends Component {
    getTeamName = idTeam => {
        // eslint-disable-next-line array-callback-return
        let name = this.props.teams.map((element) => {
            if (element.value === idTeam) return element.label
        })
        return name
    }

    getUserName = idUser => {
        // eslint-disable-next-line array-callback-return
        let name = this.props.users.map((element) => {
            if (element.id === idUser) return element.display_name
        })
        return name
    }

    componentDidMount() {
        this.props.onGetTasks(this.props.idProject)
        this.props.onGetProjectTeams(this.props.idProject)
        this.props.onGetUsersByProject(this.props.idProject)
    }

    render() {
        let taskFilter = this.props.tasks.length === 0 || this.props.teams.length === 0 || this.props.users.length === 0
            ? null
            : <Filter idProject={this.props.idProject} />

        let tasksHeaders = this.props.tasks.length === 0 || this.props.teams.length === 0 || this.props.users.length === 0
            ? null
            : <div className='task-headers-wrapper'>
                <div id='item-title' className='task-header-item'>Titulo</div>
                <div id='item-user' className='task-header-item'>Asignado a</div>
                <div id='item-state' className='task-header-item'>Estado</div>
                <div id='item-team' className='task-header-item'>Equipo</div>
                <div id='item-date' className='task-header-item'>Fecha</div>
            </div>

        let tasks = this.props.teams.length === 0 || this.props.users.length === 0
            ? <Loading />
            : this.props.tasks.length === 0
                ? <div className="no-tasks-message">No tienes tareas</div>
                : this.props.tasks.map((task, index) => {
                return <TaskRow
                    key={task.id}
                    title={task.title}
                    user={this.getUserName(task.UserId)}
                    state={getTaskStateString(task.state)}
                    team={this.getTeamName(task.TeamId)}
                    date={task.delivery_date}
                    onClick={() => this.props.onShowModal(modalTypes.TASK_MODAL, { 
                        idTask: task.id, 
                        idProject: this.props.idProject, 
                        idUser: task.UserId, 
                        idTeam: task.TeamId, 
                        idState: task.state,
                        date: task.delivery_date
                        })}
                />
            })

        return (
            <div className="container-project-tasks">
                {taskFilter}
                {tasksHeaders}
                {tasks}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.task.getTasksByProjectLoading,
        tasks: state.task.tasks,
        teams: state.team.projectTeams,
        users: state.project.usersByProject
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onShowModal: (modalType, modalData) => dispatch(actions.showModal(modalType, modalData)),
        onGetTasks: (idProject) => dispatch(actions.getTasksByProject(idProject)),
        onGetProjectTeams: (idProject) => dispatch(actions.getProjectTeams(idProject)),
        onGetUsersByProject: (idProject) => dispatch(actions.getUsersByProject(idProject))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)