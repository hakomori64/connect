import React from 'react';
import { withFirebase } from '../../Firebase';
import Message from '../Message';


class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        const message_ref = this.props.firebase.store
            .collection('rooms')
            .doc(this.props.room_id)
            .collection('messages');
        this.state = {
            message_ref: message_ref,
            typing_message: '',
            messages: [],
        };
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.state.message_ref.orderBy('timestamp', 'asc').get()
            .then(querySnapshot => {
                const messages = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const message = {
                        left_by: data.left_by,
                        content: data.content,
                        timestamp: data.timestamp.toDate(),
                    };
                    messages.push(message);
                });
                this.setState({
                    messages: messages
                });
        });
        console.log(this.state);
    }

    handleChange = event => {
        this.setState({typing_message: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const messages = this.state.messages;
        const message = {
            content: this.state.typing_message,
            left_by: this.props.user.email,
            timestamp: new Date(),
        };
        messages.push(message);
        this.setState({
            messages: messages,
            typing_message: '',
        });

        this.state.message_ref.add(message);
    }

    render() {

        return (
            <div>
                <div>
                    {this.state.messages.map((message, index) => (
                        <Message message={message} key={index} />
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

export default withFirebase(ChatRoom);