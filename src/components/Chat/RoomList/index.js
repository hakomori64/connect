import React from 'react';
import { withAuthorization } from '../../Auth/Session';
import {
    Link,
} from 'react-router-dom';


class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms_info: {},
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.authUser && !this.props.authUser) {
            console.log(nextProps.authUser);
            nextProps.authUser.room_ids.forEach(room_id => {
                this.props.firebase.store.collection('rooms').doc(room_id).get().then(doc => {
                    const messages_ref = doc.ref.collection('messages');
                    messages_ref.orderBy('timestamp', 'desc')
                        .onSnapshot(messageSnapshot => {
                            const { rooms_info } = this.state;
                            rooms_info[room_id] = {};
                            rooms_info[room_id].name = doc.data().name;
                            if (messageSnapshot.docs.length > 0) {
                                rooms_info[room_id].latest_message = messageSnapshot.docs[0].data();
                            }
                            this.setState({rooms_info});
                        });
                });
            });
        }

        return true;
    }

    render() {
        return (
            <div>
                {Object.entries(this.state.rooms_info) ? Object.keys(this.state.rooms_info).map(room_id => (
                    <li key={room_id}>
                        <Link to={`/rooms/${room_id}`}>{this.state.rooms_info[room_id].name}</Link>
                        <div>{this.state.rooms_info[room_id].latest_message ? this.state.rooms_info[room_id].latest_message.content : null}</div>
                    </li>
                )) : null}
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(RoomList);