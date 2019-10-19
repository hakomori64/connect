import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import styled from 'styled-components';

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
import Approve from '../Matching/Approve';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Auth/Session';
//import Grid from '@material-ui/core/Grid';


const Grid = styled.div`
display: grid;
grid-template-columns: 100px auto;
`;

const NavigationGrid = styled.div`
grid-column: 1/2;
`;

const ContentGrid = styled.div`
grid-column: 2/3;
`;


const Fixed = styled.div`
    position: fixed;
    top: 200px;
    left: 10px;
    margin: 0;
`;

const App = () => (
    <Router>
        <div>
            <Grid>
                <NavigationGrid>
                    <Fixed>
                        <Navigation/>
                    </Fixed>
                </NavigationGrid>
                <ContentGrid>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                    <Route path={ROUTES.ROOM} component={ChatRoom} />
                    <Route path={ROUTES.MATCHING} component={Matching} />
                    <Route path={ROUTES.APPROVE} component={Approve} />
                </ContentGrid>
            </Grid>
            
        </div>
    </Router>
)

export default withAuthentication(App);
