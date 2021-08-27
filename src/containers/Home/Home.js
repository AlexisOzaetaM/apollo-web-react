import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Toolbar from '../../components/Toolbar/Toolbar'
import ToggleButton from '../../components/ToggleButton/ToggleButton'

import './Home.css';

class Home extends Component {


    render() {

        let toolbar = <div className="container-project-toolbar">
            <Toolbar>
                <div className="project-toolbar-wrapper">
                    <ToggleButton clicked={() => this.props.onCollapseLateralMenu()} />
                    <div className="project-toolbar-title">Inicio</div>
                </div>
            </Toolbar>
        </div>

        return (
            <div className="main-home-wrapper">
                {toolbar}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        isCollapsed: state.lateralMenu.isCollapsed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCollapseLateralMenu: () => dispatch(actions.collapseLateralMenu())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);