import React from 'react';
import Message from '../Message';
import { withAuthorization } from '../../Auth/Session';


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        const message_ref = this.props.firebase.store
            .collection('rooms')
            .doc(this.props.match.params.room_id)
            .collection('messages');
        this.state = {
            message_ref: message_ref,
            typing_message: '',
            messages: [],
        };
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.state.message_ref.orderBy('timestamp', 'asc')
            .onSnapshot(querySnapshot => {
                const messages = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const message = {
                        left_by: data.left_by,
                        left_user_id: data.left_user_id,
                        content: data.content,
                        timestamp: data.timestamp.toDate(),
                    };
                    messages.push(message);
                });
                this.setState({
                    messages: messages
                });
        });
    }

    handleChange = event => {
        this.setState({typing_message: event.target.value});
    }

    handleSubmit = event => {
        const messages = this.state.messages;
        
        const message = {
            left_by: this.props.authUser.username,
            left_user_id: this.props.authUser.userID,
            content: this.state.typing_message,
            timestamp: new Date(),
        };
        messages.push(message);
        this.setState({
            messages: messages,
            typing_message: '',
        });

        this.state.message_ref.add(message);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>
                    {this.props.match.params.room_id}
                </h1>
                <div>
                    {this.state.messages.map((message, index) => (
                        this.props.authUser ? <Message message={message} key={index} /> : null
                    ))}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="message"
                        value={this.state.typing_message}
                        onChange={this.handleChange}
                        placeholder="Leave a message"
                        type="text"
                    />
                </form>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(ChatRoom);