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

    componentDidMount() {
        const rooms_info = {};
        this.props.firebase.store.collection('rooms')
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const room_info = {}
                    const messages_ref = doc.ref.collection('messages');
                    messages_ref.orderBy('timestamp', 'desc')
                        .onSnapshot(messageSnapshot => {
                            room_info.name = doc.data().name;
                            if (messageSnapshot.docs.length > 0) {
                                room_info.latest_message = messageSnapshot.docs[0].data()
                            }
                            rooms_info[doc.id] = room_info;
                        });
                })
                this.setState({
                    rooms_info: rooms_info
                });
            });
    }

    render() {
        return (
            <div>
                {this.props.authUser && this.state.rooms_info? this.props.authUser.room_ids.map((room_id, index) => (
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