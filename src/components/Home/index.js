import React from 'react';
import { withAuthorization } from '../Auth/Session';
import RoomList from '../Chat/RoomList';


const HomePage = props => (
    <div>
        <h1>This is Home Page</h1>
        <p>Chat Rooms will be Here!!</p>
        <RoomList />
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);