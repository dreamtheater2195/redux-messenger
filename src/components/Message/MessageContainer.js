import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const mapStateToProps = (state, { message }) => {
    return {
        text: message.get(`content`).get(`text`),
        owner: {
            name: message.get(`owner`)
        }
    }
};

const mapDispatchToProps = (dispatch) => ({});

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);

export default MessageContainer;