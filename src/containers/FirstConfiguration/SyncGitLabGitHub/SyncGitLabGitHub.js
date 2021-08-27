import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import * as actions from '../../../store/actions/index';

import './SyncGitLabGitHub.css'

class SyncGitLabGitHub extends Component {
    state = {
        GitLabToken: '',
        GitHubToken: '',
        GitLabLink: 'https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html',
        GitHubLink: 'https://help.github.com/es/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line'
    };

    GitLabTokenChangedHandler = (event) => {
        this.setState({ GitLabToken: event.target.value })
    }

    GitHubTokenChangedHandler = (event) => {
        this.setState({ GitHubToken: event.target.value })
    }

    SyncGitLabHandler = (event) => {
        event.preventDefault();
        this.props.OnSyncGitLab(this.state.GitLabToken);
    }

    SyncGitHubHandler = (event) => {
        event.preventDefault();
        this.props.OnSyncGitHub(this.state.GitHubToken);
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    render() {
        let form = <div className="form-wrapper-SyncGitLabGitHub" >
            <form name="SyncGitLabGitHub" id="SyncGitLabGitHub" onSubmit={this.submitHandler}>
                <span className="form-title">Sincroniza tu cuenta de GitLab o GitHub</span><br />
                <span className="sub-sync">Para esto necesitas generar un token de acceso personal desde tu cuenta de GitLab o GitHub{<br/>}*Este Paso no es obligatorio</span>
                <Input
                    inputType='text'
                    hint='Token de GitLab'
                    required={false}
                    className='InputToken'
                    changed={this.GitLabTokenChangedHandler}
                />
                <span className="instructions">Aquí tienes las <a href={this.state.GitLabLink} target="_blank" rel="noopener noreferrer"><span className="link-hint-option">instrucciones</span></a> para generar el token, selecciona los permisos necesarios para usar tus proyectos</span>
                <Button isPrimary={false} buttonText='Sincronizar' clicked={this.SyncGitLabHandler} />
                <Input
                    inputType='text'
                    hint='Token de GitHub'
                    required={false}
                    changed={this.GitHubTokenChangedHandler}
                />
                <span className="instructions">Aquí tienes las <a href={this.state.GitHubLink} target="_blank" rel="noopener noreferrer"><span className="link-hint-option">instrucciones</span></a> para generar el token, selecciona los permisos necesarios para usar tus proyectos</span>
                <Button isPrimary={false} buttonText='Sincronizar' clicked={this.SyncGitHubHandler} />
                <div className="InlineButtons">
                    <Button isPrimary={false} buttonText='Regresar' clicked={this.props.onBack} />
                    <Button isPrimary={true} buttonText='Finalizar' clicked={this.props.onFinish} />
                </div>
            </form>
        </div>

        return (
            <div className="container-SyncGitLabGitHub" >
                {form}
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        loading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        OnSyncGitLab: (GitLabToken) => dispatch(actions.SyncGitLabToken(GitLabToken)),
        OnSyncGitHub: (GitHubToken) => dispatch(actions.SyncGitHubToken(GitHubToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncGitLabGitHub);