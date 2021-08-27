import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/Input/Input';
import ProfileDetailsButton from './ProfileDetailsButton/ProfileDetailsButton'
import Button from '../../../components/Button/Button';
import Avatars from '../../../components/Avatars/Avatars'
import * as actions from '../../../store/actions/index';

import './ProfileDetails.css'

class ProfileDetails extends Component {
    state = {
        avatar: '',
        username: this.props.user !== null ? this.props.user.username : '',
        display_name: this.props.user !== null ? this.props.user.display_name : '',
        email: this.props.user !== null ? this.props.user.mail : ''
    };

    usuarioChengedHandler = (event) => {
        this.setState({ username: event.target.value })
    }

    nombreChangedHandler = (event) => {
        this.setState({ display_name: event.target.value })
    }

    emailChangedHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    avatarChangedHandler = (event) => {
        this.setState({ avatar: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSaveProfileDetails(this.state.avatar, this.state.username, this.state.display_name, this.state.email)
    }

    render() {
        let button = !this.props.success ? <ProfileDetailsButton /> : <Button isPrimary={false} buttonText='Siguiente' clicked={this.props.onNext} />;

        let form = <div className="form-wrapper-profiledetails" >
            <form name="profiledetails-form" id="profiledetails-form" onSubmit={this.submitHandler}>
                <span className="form-title">Detalles de tu perfil</span>
                <Avatars changed={this.avatarChangedHandler} />
                <Input
                    inputType='text'
                    hint='Teclea tu usuario(p. ej. DavidRu4321)'
                    required={true}
                    changed={this.usuarioChengedHandler}
                    value={this.state.username}
                />
                <Input
                    inputType='text'
                    hint='Teclea tu nombre'
                    required={true}
                    changed={this.nombreChangedHandler}
                    value={this.state.display_name}
                />
                <Input
                    inputType='email'
                    hint='Teclea tu correo electr&oacute;nico'
                    required={true}
                    changed={this.emailChangedHandler}
                    value={this.state.email}
                />
                {button}
            </form>
        </div>

        return (
            <div className="container-profiledetails" >
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.user.userData,
        success: state.user.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveProfileDetails: (avatar, username, display_name, email) => dispatch(actions.saveProfileDetails(avatar, username, display_name, email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);