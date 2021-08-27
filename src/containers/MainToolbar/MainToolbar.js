import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as modalTypes from '../../constants/modals';
import { Redirect } from 'react-router';

import './MainToolbar.css';

class MainToolbar extends Component {
    state = {
        displayNewMenu: false,
        displayProfileMenu: false
    };

    constructor() {
        super();
        this.showDropdownNewMenu = this.showDropdownNewMenu.bind(this);
        this.showDropdownProfileMenu = this.showDropdownProfileMenu.bind(this);
    };

    showDropdownNewMenu(event) {
        event.preventDefault();
        this.setState({
            displayNewMenu: !this.state.displayNewMenu,
            displayProfileMenu: false
        });
    }

    showDropdownProfileMenu(event) {
        event.preventDefault();
        this.setState({ 
            displayProfileMenu: !this.state.displayProfileMenu,
            displayNewMenu: false 
        });
    }

    componentDidMount() {
        this.props.onGetUserData();
    }

    render() {
        let tokenHasExpired = this.props.error === 'Acceso denegado.'
            ? <Redirect to="/" />
            : null

        return (
            <div className="main-toolbar-wrapper dropdown-wrapper">
            {tokenHasExpired}
                <div className="dropdown">
                    <div className="plus" onClick={this.showDropdownNewMenu}></div>
                    {this.state.displayNewMenu
                        ? (<ul className='newMenu-wrapper'>
                            <li onClick={() => this.props.onShowModal(modalTypes.NEW_PROJECT_MODAL)}>Proyecto</li>
                            <li onClick={() => this.props.onShowModal(modalTypes.NEW_TASK_MODAL)}>Tarea</li>
                        </ul>)
                        : null}
                </div>

                <div className="dropdown">
                    <div className={'profile avatar' + ((this.props.user !== null) ? this.props.user.avatar : 1)} onClick={this.showDropdownProfileMenu}></div>
                    {this.state.displayProfileMenu
                        ? (<ul className='profileMenu-wrapper'>
                            <li onClick={() => this.props.onShowModal(modalTypes.SETTINGS_MODAL)}>Configuraci&oacute;n</li>
                            <li onClick={() => this.props.onLogout()}>Cerrar sesi&oacute;n</li>
                        </ul>)
                        : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userData,
        error: state.user.error,
        logout: state.login.logout
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: () => dispatch(actions.getUserData()),
        onLogout: () => dispatch(actions.logout()),
        onShowModal: (modalType) => dispatch(actions.showModal(modalType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainToolbar);