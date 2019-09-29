import React from 'react';
import { withAuthorization } from '../Auth/Session';
import ChatFormPage from '../Chat/ChatForm';
import ChatRoom from '../Chat/ChatRoom';

const HomePage = props => (
    <div>
        <h1>This is Home Page</h1>
        <p>Chat Rooms will be Here!!</p>
        <ChatRoom room_id={'hello'} user={props.authUser} />
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);