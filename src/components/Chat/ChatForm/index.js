import React from 'react';
import { withFirebase } from '../../Firebase';
import Message from '../Message';


class ChatFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            chats: [],
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const chat = {
            content: this.state.message,
            left_by: this.props.user.email,
            timestamp: new Date(),
        };
        this.props.firebase.general().push(chat);
        const chats = this.state.chats;
        chats.push(chat);
        this.setState({
            message: '',
            chats: chats
        });
    }

    render() {
        return (
            <div>
                <h2>Chat App</h2>
                <div>
                    <ul>
                        {this.state.chats.map((chat, index) => (
                            <Message message={chat} key={index} />
                        ))}
                    </ul>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        placeholder="Leave a message ..."
                        type="text"
                    />
                </form>
            </div>
        )
    }
}

export default withFirebase(ChatFormBase);