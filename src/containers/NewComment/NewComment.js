import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

import './NewComment.css'

class NewComment extends Component {
    state = {
        description: ''
    }

    descriptionChangedHandler = event => {
        this.setState({ description: event.target.value })
    }

    submitHandler = event => {
        event.preventDefault()
        if (this.state.description.length > 0)
            this.props.onNewComment(this.props.idTask, this.state.description)
    }

    render() {
        let button = this.props.loading
            ? <Spinner />
            : <div className="create-comment-button-wrapper" onClick={this.submitHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" /></svg>
            </div>

        return (
            <div className="container-new-comment">
                <div className="new-comment-wrapper">
                    <textarea
                        value={this.state.description}
                        onChange={this.descriptionChangedHandler}
                    />
                </div>
                <div className="container-create-comment-button">
                    {button}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.comment.newCommentError,
        loading: state.comment.newCommentLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewComment: (idTask, description) => dispatch(actions.newComment(idTask, description))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)