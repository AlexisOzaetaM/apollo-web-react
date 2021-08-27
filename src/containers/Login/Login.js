import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/Input/Input';
import Notification from '../../components/Notification/Notification';
import Button from '../../components/Button/Button';
import GoogleButton from './GoogleButton/GoogleButton';
import FacebookButton from './FacebookButton/FacebookButton';
import Separator from '../../components/UI/Separaton/Separator';
import ApolloLogo from '../../components/UI/Logo/Logo';
import SignupOption from './SignupOption/SignupOption';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

import './Login.css'
import { Redirect } from 'react-router';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errorGoogle: null,
        errorFacebook: null
    };

    emailChangedHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    passwordChangedHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.email, this.state.password);
    }

    googleAuthHandler = (event) => {
        event.preventDefault();
        window.location.href = "https://apollo-1.azurewebsites.net/auth/google";
    }

    facebookAuthHandler = (event) => {
        event.preventDefault();
        window.location.href = "https://apollo-1.azurewebsites.net/auth/facebook";
    }

    render() {
        let notification = this.props.error ? <Notification notificationStyle='error' message={this.props.error} /> : null;
        
        let redirectHome = this.props.success ? <Redirect to="/config" /> : null; 
        
        let form;
        this.props.loading
            ? form = <Spinner />
            : form = <div className="form-wrapper-login" >
                <form name="login-form" id="login-form" onSubmit={this.submitHandler} >
                    <span className="form-title">Inicia sesión en Apollo</span>
                    <Input
                        inputType='email'
                        hint='Teclea el correo electrónico'
                        required={true}
                        changed={this.emailChangedHandler}
                    />
                    <Input
                        inputType='password'
                        hint='Teclea la contraseña'
                        required={true}
                        changed={this.passwordChangedHandler}
                    />
                    <Button isPrimary="true" buttonText="Iniciar sesión"/>
                </form>
                <span className="or">O</span>
                <GoogleButton clicked={this.googleAuthHandler} />
                <FacebookButton clicked={this.facebookAuthHandler} />
                <Separator />
                <SignupOption />
            </div>

        return (
            <div className="container-login" >
                {notification}
                {redirectHome}
                <ApolloLogo />
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.login.loading,
        error: state.login.error,
        success: state.login.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);