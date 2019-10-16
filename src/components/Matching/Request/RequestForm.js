import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';


class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room_name: "",
            message: "",
        }
    }

    handleRoomNameChange = event => {
        this.setState({
            room_name: event.target.value,
        });
    }

    handleMessageChange = event => {
        this.setState({
            message: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const data = {
            room_name: this.state.room_name,
            message: this.state.message,
            from: this.props.authUser.userID,
        };
        this.props.firebase.store.collection("requests").add(data)
            .then(doc => {
                const user_ref = this.props.firebase.store.collection("users").doc(this.props.to);
                this.props.firebase.store.runTransaction(transaction => {
                    return transaction.get(user_ref).then(user_doc => {
                        if (!user_doc.exists) {
                            return;
                        }
                        const user_connect_request = user_doc.data().connect_request;
                        user_connect_request.push(doc.id);
                        transaction.update(user_ref, {connect_request: user_connect_request});
                    });
                }).catch(error => {
                    console.log("Transaction failed: ", error);
                });
            });
        this.setState({
            room_name: "",
            message: "",
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>Room Name:</div>
                <input
                    type="text"
                    onChange={this.handleRoomNameChange}
                    value={this.state.room_name}
                />
                <div>Leave a message to this User.</div>
                <textarea
                    value={this.state.message}
                    onChange={this.handleMessageChange}
                ></textarea>
                <button onClick={this.handleSubmit}>Send Request</button>
            </form>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(RequestForm);