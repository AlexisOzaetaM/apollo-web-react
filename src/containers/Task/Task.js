import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertDate } from '../../utils/dates'
import * as actions from '../../store/actions/index'
import * as modalTypes from '../../constants/modals'
import Loading from '../../components/Loading/Loading'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Select from 'react-select'
import TextA from '../../components/TextArea/TextArea'
import Notification from '../../components/Notification/Notification'
import Comment from '../../components/Comment/Comment'
import NewComment from '../NewComment/NewComment'

import './Task.css'

class Task extends Component {
    state = {
        task: {
            id: null,
            title: '',
            description: '',
            delivery_date: '',
            state: null,
            TeamId: null,
            UserId: null
        },
        project: null,
        stateList: [
            { value: 1, label: 'Abierto' },
            { value: 2, label: 'Proceso' },
            { value: 3, label: 'Completada' },
            { value: 4, label: 'Cancelada' }
        ]
    }

    titleChangedHandler = event => {
        const task = { ...this.state.task }
        task.title = event.target.value
        this.setState({
            task: task
        })
    }

    descriptionChangedHandler = event => {
        const task = { ...this.state.task }
        task.description = event.target.value
        this.setState({
            task: task
        })
    }

    dueDateChangedHandler = event => {
        const task = { ...this.state.task }
        task.delivery_date = event.target.value
        this.setState({
            task: task
        })
    }

    selectTeamHandler = optionSelected => {
        const task = { ...this.state.task }
        task.TeamId = optionSelected
        task.UserId = null
        this.setState({
            task: task
        })
        this.props.onGetTeamUsers(optionSelected.value)
    }

    selectUserHandler = optionSelected => {
        const task = { ...this.state.task }
        task.UserId = optionSelected
        this.setState({
            task: task
        })
    }

    selectStateHandler = optionSelected => {
        const task = { ...this.state.task }
        task.state = optionSelected
        this.setState({
            task: task
        })
    }

    getTaskTeam = () => {
        let taskTeam = null
        if (this.props.projectTeams) {
            this.props.projectTeams.forEach(team => {
                if (team.value === this.props.taskData.idTeam) taskTeam = team
            })
        }

        return taskTeam
    }

    getTaskUser = () => {
        let taskUser = null
        if (this.props.teamUsers) {
            this.props.teamUsers.forEach(user => {
                if (user.value === this.props.taskData.idUser) taskUser = user
            })
        }

        return taskUser
    }

    getTaskState = () => {
        let taskState = null
        this.state.stateList.forEach(state => {
            if (state.value === this.props.taskData.idState) taskState = state
        })

        return taskState
    }

    submitHandler = (event) => {
        event.preventDefault();
        const task = { ...this.state.task }
        task.title = task.title === '' ? this.props.originalTask.title : task.title
        task.description = task.description === '' ? this.props.originalTask.description : task.description
        task.TeamId = task.TeamId === null ? this.props.originalTask.TeamId : task.TeamId
        task.UserId = task.UserId === null ? this.props.originalTask.UserId : task.UserId
        task.state = task.state === null ? this.props.originalTask.state : task.state

        this.props.onUpdateTask(task)
    }

    componentDidMount() {
        this.props.onGetTask(this.props.taskData.idTask)
        this.props.onGetTeamUsers(this.props.taskData.idTeam)
        this.props.onGetComments(this.props.taskData.idTask)

        const task = { ...this.state.task }
        task.id = this.props.taskData.idTask
        task.delivery_date = convertDate(this.props.taskData.date)
        this.setState({
            task: task
        })
    }

    componentWillUnmount() {
        if (this.props.taskDeleted)
            this.props.onGetTasksByProject(this.props.taskData.idProject)
    }

    render() {
        if (this.props.taskDeleted)
            this.props.onHideModal(modalTypes.NON_MODAL)

        let notification = (this.props.editSuccess)
            ? <Notification notificationStyle='success' message={this.props.editSuccess} />
            : (this.props.editError)
                ? <Notification notificationStyle='error' message={this.props.editError} />
                : (this.props.deleteError)
                    ? <Notification notificationStyle='error' message={this.props.deleteError} />
                    : (this.props.commentsError)
                        ? <Notification notificationStyle='error' message={this.props.commentsError} />
                        : (this.props.newCommentError)
                            ? <Notification notificationStyle='error' message={this.props.newCommentError} />
                            : null

        let comments = this.props.commentsLoading
            ? <Loading />
            : this.props.comments
                ? this.props.comments.map((comment, index) => {
                    return <Comment
                        key={comment.id}
                        user={comment.user}
                        date={convertDate(comment.date)}
                        comment={comment.comment}
                    />
                })
                : <div className="no-comments-message">No hay comentarios</div>

        let taskAndComments = this.props.loading || this.props.deleteLoading || this.props.editLoading
            ? <Loading />
            : <form name="task-form" id="task-form" onSubmit={this.submitHandler}>
                <span className="form-title">Editar proyecto</span>
                <Input
                    inputType='text'
                    hint='Teclea el titulo de la tarea'
                    required={true}
                    changed={this.titleChangedHandler}
                    value={this.state.task.title || this.props.originalTask.title}
                />
                <TextA
                    value={this.state.task.description || this.props.originalTask.description}
                    changed={this.descriptionChangedHandler}
                    hint='Teclea la  descripci&oacute;n'
                    required={false}
                />
                <div className="two-selects-wrapper">
                    <div className="selector">
                        <span>Equipo</span>
                        <Select
                            className="select-wrapper"
                            onChange={this.selectTeamHandler}
                            options={this.props.projectTeams}
                            value={this.state.task.TeamId || this.getTaskTeam()}
                        />
                    </div>
                    <div className="selector">
                        <span>Asignar a</span>
                        <Select
                            className="select-wrapper"
                            isDisabled={this.state.usuario}
                            options={this.props.teamUsers}
                            onChange={this.selectUserHandler}
                            value={this.state.task.UserId || this.getTaskUser()}
                        />
                    </div>
                </div>
                <div className="two-selects-wrapper">
                    <div className="selector">
                        <span>Fecha de entrega</span>
                        <Input
                            inputType='date'
                            value={this.state.task.delivery_date}
                            required={false}
                            changed={this.dueDateChangedHandler}
                        />
                    </div>
                    <div className="selector">
                        <span >Estado</span>
                        <Select
                            className="select-wrapper"
                            options={this.state.stateList}
                            onChange={this.selectStateHandler}
                            value={this.state.task.state || this.getTaskState()}
                        />
                    </div>
                </div>
                <span>Comentarios</span>
                <div className="task-comments-container">
                    {comments}
                    <NewComment idTask={this.props.taskData.idTask} />
                </div>
                <div className="InlineButtons">
                    <Button isPrimary={false} buttonText='Cancelar' clicked={() => this.props.onHideModal(modalTypes.NON_MODAL)} />
                    <Button buttonText="Eliminar" isPrimary={false} clicked={() => this.props.onDeleteTask(this.props.taskData.idTask)} />
                    <Button buttonText="Editar" isPrimary={true} />
                </div>
            </form>

        return (
            <div>
                {notification}
                {taskAndComments}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        originalTask: state.task.task,
        userProjects: state.project.userProjects,
        projectTeams: state.team.projectTeams,
        teamUsers: state.team.teamUsers,
        loading: state.task.getTaskLoading,
        deleteError: state.task.deleteError,
        deleteLoading: state.task.deleteLoading,
        editSuccess: state.task.editSuccess,
        editError: state.task.editError,
        editLoading: state.task.editLoading,
        taskEdited: state.task.taskEdited,
        taskDeleted: state.task.taskDeleted,
        commentsLoading: state.comment.getCommentsLoading,
        commentsError: state.comment.getCommentsError,
        comments: state.comment.comments,
        newCommentError: state.comment.newCommentError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onGetTasksByProject: (idProject) => dispatch(actions.getTasksByProject(idProject)),
        onGetTask: (idTask) => dispatch(actions.getTask(idTask)),
        onDeleteTask: (idTask) => dispatch(actions.deleteTask(idTask)),
        onUpdateTask: (task) => dispatch(actions.editTask(task)),
        onGetUserProjects: () => dispatch(actions.getUserProjects()),
        onGetProjectTeams: (idProject) => dispatch(actions.getProjectTeams(idProject)),
        onGetTeamUsers: (idTeam) => dispatch(actions.getTeamUsers(idTeam)),
        onGetComments: (idTask) => dispatch(actions.getComments(idTask))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task)