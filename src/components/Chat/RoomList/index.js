import React from 'react';
import { withAuthorization } from '../../Auth/Session';
import {
    Link,
} from 'react-router-dom';


class RoomList extends React.Component {

    render() {
        return (
            <div>
                {this.props.authUser ? this.props.authUser.room_ids.map((room_id, index) => (
                    <li key={room_id}>
                        <Link to={`/rooms/${room_id}`}>{room_id}</Link>
                    </li>
                )) : null}
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(RoomList);