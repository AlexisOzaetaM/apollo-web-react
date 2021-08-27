import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditProfile.css'
import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/actions/index';
import Button from '../../components/Button/Button';
import * as modalTypes from '../../constants/modals'

class EditLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            display_name: "",
            email: "",
            avatar: "",
            initalized: false
        }
    }

    usuarioChengedHandler = (event) => {
        this.setState({ username: event.target.value })
    }

    emailChangedHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    nombreChangedHandler = (event) => {
        this.setState({ display_name: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onUpdateUserData(this.state.display_name, this.state.username, this.state.email, this.state.avatar);
    }

    avatarChangedHandler = (event) => {
        this.setState({ avatar: parseInt(event.target.value) })
    }

    componentDidMount() {
        this.props.onGetUser();
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
                <span className="form-title">Editar perfil</span>
                <div className="wrapper-avatar">
                    <span className="instrucion">Elige un avatar</span>
                    <div className="cc-selector">
                        <input id="av1" type="radio" name="avatars" value="1" required onChange={this.avatarChangedHandler} checked={this.props.userData.avatar === 1} />
                        <label className="drinkcard-cc avatar1" htmlFor="av1"></label>

                        <input id="av2" type="radio" name="avatars" value="2" required onChange={this.avatarChangedHandler} checked={this.props.userData.avatar === 2} />
                        <label className="drinkcard-cc avatar2" htmlFor="av2"></label>

                        <input id="av3" type="radio" name="avatars" value="3" required onChange={this.avatarChangedHandler} checked={this.props.userData.avatar === 3} />
                        <label className="drinkcard-cc avatar3" htmlFor="av3"></label>

                        <input id="av4" type="radio" name="avatars" value="4" required onChange={this.avatarChangedHandler} checked={this.props.userData.avatar === 4} />
                        <label className="drinkcard-cc avatar4" htmlFor="av4"></label>

                        <input id="av5" type="radio" name="avatars" value="5" required onChange={this.avatarChangedHandler} checked={this.props.userData.avatar === 5} />
                        <label className="drinkcard-cc avatar5" htmlFor="av5"></label>
                    </div>
                </div>
                <Input
                    inputType='text'
                    hint='Teclea tu usuario(p. ej. DavidRu4321)'
                    required={true}
                    changed={this.usuarioChengedHandler}
                    value={this.props.userData.username ? this.props.userData.username : this.state.username}
                />
                <Input
                    inputType='text'
                    hint='Teclea tu nombre'
                    required={true}
                    changed={this.nombreChangedHandler}
                    value={this.props.userData.display_name ? this.props.userData.display_name : this.state.display_name}
                />
                <Input
                    inputType='email'
                    hint='Teclea tu correo electr&oacute;nico'
                    required={true}
                    changed={this.emailChangedHandler}
                    value={this.props.userData.mail ? this.props.userData.mail : this.state.email}
                />
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
        loading: state.user.loading,
        error: state.user.error,
        success: state.user.success,
        userData: state.user.userData
    };
};
const mapDispatchToDrops = dispatch => {
    return {
        onHideModal: (modalType) => dispatch(actions.showModal(modalType)),
        onGetUser: () => dispatch(actions.getUserData()),
        onUpdateUserData: (display_name, username, email, avatar) => dispatch(actions.updateUserData(display_name, username, email, avatar))
    };
};
export default connect(mapStateToProps, mapDispatchToDrops)(EditLevel);