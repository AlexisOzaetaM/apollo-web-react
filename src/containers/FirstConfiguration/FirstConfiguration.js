import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Notification from '../../components/Notification/Notification';
import Loading from '../../components/Loading/Loading';
import Profile from './ProfileDetails/ProfileDetails';
import Project from './Project/Project';
import Repos from './SyncGitLabGitHub/SyncGitLabGitHub';
import Path from './Path/Path';

import './FirstConfiguration.css';

class FirstConfiguration extends Component {
    state = {
        currentStep: 1,
        firstConfiguration: this.props.user !== null ? this.props.user.first_configuration : null
    };

    nextChanged = () => {
        if (this.state.currentStep < 3)
            this.setState({ currentStep: this.state.currentStep + 1 });
    }

    backChanged = () => {
        if (this.state.currentStep > 1)
            this.setState({ currentStep: this.state.currentStep - 1 });
    }

    componentDidMount() {
        this.props.onGetUserData();
    }

    finishFirstConfiguration = () => {
        this.props.onFinishFirstConfiguration();
    }

    render() {
        let redirectToHome = null;
        if (this.props.user !== null) redirectToHome = (this.props.user.first_configuration || this.props.firstConfigurationCompleted) ? <Redirect to="/app/home" /> : null;

        let loading = this.props.loading ? <Loading /> : null;

        let notification = null;
        notification = (this.props.error && (this.state.currentStep === 1 || this.state.currentStep === 3))
            ? <Notification notificationStyle='error' message={this.props.error} />
            : (this.props.success && (this.state.currentStep === 1 || this.state.currentStep === 3))
                ? <Notification notificationStyle='success' message={this.props.success} />
                : (this.props.errorProject && this.state.currentStep === 2)
                    ? <Notification notificationStyle='error' message={this.props.errorProject} />
                    : (this.props.successProject && this.state.currentStep === 2)
                        ? <Notification notificationStyle='success' message={this.props.successProject} />
                        : null;

        let StepComponent = (this.state.currentStep === 1 & !this.props.loading)
            ? <Profile onNext={this.nextChanged} />
            : (this.state.currentStep === 2 & !this.props.loading)
                ? <Project onBack={this.backChanged} onNext={this.nextChanged} />
                : (this.state.currentStep === 3 & !this.props.loading)
                    ? <Repos onNext={this.finishFirstConfiguration} onBack={this.backChanged} onFinish={this.finishFirstConfiguration} />
                    : null;

        return (
            <div className="main-first-confguration-wrapper">
                {redirectToHome}
                {notification}
                <Path currentStep={this.state.currentStep} />
                {loading}
                {StepComponent}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        error: state.user.error,
        success: state.user.success,
        user: state.user.userData,
        firstConfigurationCompleted: state.user.firstConfigurationCompleted,
        errorProject: state.project.error,
        successProject: state.project.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFinishFirstConfiguration: () => dispatch(actions.firstConfigurationHasCompleted()),
        onGetUserData: () => dispatch(actions.getUserData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstConfiguration);