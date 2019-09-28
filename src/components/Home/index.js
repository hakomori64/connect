import React from 'react';
import { withAuthorization } from '../auth/Session';
import ChatFormPage from '../ChatForm';

const HomePage = props => (
    <div>
        <h1>This is Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <ChatFormPage user={props.authUser} />
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);