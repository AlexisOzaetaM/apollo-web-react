import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import './Loading.css';
import Logo from '../../components/UI/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Loading extends Component {

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries())
            this.props.onSaveToken(param[1]);
    };

    render() {

        let redirect = (this.props.success) ? <Redirect from="/loading" to="/config" /> : null;

        return (
            <div className="loading-wrapper">
                {redirect}
                <Logo />
                <Spinner />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        success: state.loading.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveToken: (taken) => dispatch(actions.saveToken(taken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);