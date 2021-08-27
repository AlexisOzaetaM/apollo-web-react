import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';
import SignupButton from './SignupButton/SignupButton'
import Separator from '../../components/UI/Separaton/Separator';
import ApolloLogo from '../../components/UI/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import LoginOption from './LoginOption/LoginOption'

import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router';

import './Signup.css'

class Signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    emailChangedHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    passwordChengedHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    confirmPasswordChangedHandler = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSignup(this.state.email, this.state.password, this.state.confirmPassword);
    }

    render() {
        let notification = this.props.error ? <Notification notificationStyle='error' message={this.props.error} /> : null;
        
        let redirectLogin = this.props.success ? <Redirect to="/" /> : null;

        let form;
        this.props.loading
            ? form = <Spinner />
            : form = <div className="form-wrapper-signup" >
                <form name="signup-form" id="signup-form" onSubmit={this.submitHandler}>
                    <span className="form-title">Registrate en Apollo</span>
                    <Input
                        inputType='email'
                        hint='Teclea tu correo electr&oacute;nico'
                        required={true}
                        changed={this.emailChangedHandler}
                    />
                    <Input
                        inputType='password'
                        hint='Teclear la contrase&ntilde;a'
                        required={true}
                        changed={this.passwordChengedHandler}
                    />
                    <Input
                        inputType='password'
                        hint='Vuelve a teclear la contrase&ntilde;a'
                        required={true}
                        changed={this.confirmPasswordChangedHandler}
                    />
                    <SignupButton />
                </form>
                <Separator />
                <LoginOption />
            </div>
            
        return (
            <div className="container-signup" >
                {redirectLogin}
                {notification}
                <ApolloLogo />
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.signup.loading,
        error: state.signup.error,
        success: state.signup.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (email, password, confirmPassword) => dispatch(actions.signup(email, password, confirmPassword))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
