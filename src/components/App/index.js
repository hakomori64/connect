import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../Auth/SignUp';
import SignInPage from '../Auth/SignIn';
import PasswordForgetPage from '../Auth/PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ChatRoom from '../Chat/ChatRoom';
import Matching from '../Matching';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Auth/Session';
import Request from '../Matching/Request';


const App = () => (
    <Router>
        <div>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.ROOM} component={ChatRoom} />
            <Route path="/request" component={() => <Request user_id="tEqo4R8tTdQ9QyzZ0QemxMcXdLp2" />} />
            <Route path={ROUTES.MATCHING} component={Matching} />
        </div>
    </Router>
)

export default withAuthentication(App);
