import React from 'react';
import { withAuthorization } from '../Auth/Session';
import RoomList from '../Chat/RoomList';
import Container from '@material-ui/core/Container';


const HomePage = props => (
    <div>
        <Container>
        <h1>This is Home Page</h1>
        <p>Chat Rooms will be Here!!</p>
        <RoomList />
        </Container>
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);