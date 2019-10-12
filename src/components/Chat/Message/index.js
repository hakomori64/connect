import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../../Firebase';


const Img = styled.img`
    height: 50px;
    width: 50px;
`

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_icon_ref: this.props.firebase.storage.ref(`users/${this.props.message.left_user_id}/icon`),
            default_icon_ref: this.props.firebase.storage.ref('users/default.png'),
            icon_url: null,
        }
    }

    componentDidMount() {
        const { user_icon_ref, default_icon_ref } = this.state;
        user_icon_ref.getDownloadURL().then(url => {
            this.setState({
                icon_url: url
            });
        }).catch(error => {
            if (error.code === 'storage/object-not-found') {
                default_icon_ref.getDownloadURL().then(url => {
                    this.setState({
                        icon_url: url
                    });
                });
            }
        })
    }

    render() {
        return (
            <li key={this.props.index}>
                <Img src={this.state.icon_url} alt={this.props.message.left_by} />
                <span>
                    {this.props.message.left_by}:
                </span>
                {this.props.message.content}
                <small>
                    {this.props.message.timestamp.toString()}
                </small>
            </li>
        )
    }
}

export default withFirebase(Message);