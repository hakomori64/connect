import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import SignOutButton from '../Auth/SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Auth/Session';
import Fab from '@material-ui/core/Fab';


import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const FabPosision = styled.div`
position: relative;
width: 56px;
height: 56px;
`;


const ButtonShadow = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
text-decoration: none;
width:70px;
height:70px;
border-radius:50%;
text-align:center;
background:#f7f7f7;
box-shadow:inset 0 0 4px rgb(0,0,0,0.08);
`;

const NavigationAuth = () => (
    <div>
    <BottomNavigation>
            <Link to={ROUTES.LANDING}>  
                <ButtonShadow>
                    <FabPosision className={FabPosision}>
                        <Fab color="default" aria-label="add">
                            <FlightLandIcon color="secondary"/>
                        </Fab>
                    </FabPosision>
                </ButtonShadow>
            </Link>

            <Link to={ROUTES.HOME}>
                {/* <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} /> */}
                <ButtonShadow>
                    <FabPosision className={FabPosision}>
                        <Fab color="default" aria-label="add">
                            <HomeIcon color="secondary"/>
                        </Fab>
                    </FabPosision>
                </ButtonShadow>
            </Link>
            <Link to={ROUTES.ACCOUNT}>
                {/* <BottomNavigationAction label="AccountBox" value="accountbox" icon={<AccountBoxIcon />} /> */}
                <ButtonShadow>
                    <FabPosision className={FabPosision}>
                        <Fab color="default" aria-label="add">
                            <AccountBoxIcon color="secondary"/>
                        </Fab>
                    </FabPosision>
                </ButtonShadow>
            </Link>
            <Link to={ROUTES.MATCHING}>
                {/* <BottomNavigationAction label="Search" value="search" icon={<SearchIcon/>} /> */}
                <ButtonShadow>
                    <FabPosision className={FabPosision}>
                        <Fab color="default" aria-label="add">
                            <SearchIcon color="secondary"/>
                        </Fab>
                    </FabPosision>
                </ButtonShadow>
            </Link>
            <Link to={ROUTES.APPROVE}>
                {/* <BottomNavigationAction label="ContactMail" value="contactmail" icon={<ContactMailIcon/>} /> */}
                <ButtonShadow>
                    <FabPosision className={FabPosision}>
                        <Fab color="default" aria-label="add">
                            <ContactMailIcon color="secondary"/>
                        </Fab>
                    </FabPosision>
                </ButtonShadow>
            </Link>
            <SignOutButton />
        </BottomNavigation>
        <Link to={ROUTES.ADMIN}>Admin</Link>
        </div>
);

const NavigationNonAuth = () => (
    <BottomNavigation>
        <Link to={ROUTES.LANDING}>
            <BottomNavigationAction label="FrightLand" value="flightland" icon={<FlightLandIcon />} />
        </Link>
        <Link to={ROUTES.SIGN_IN}>
            <button>
                Sign In
            </button>
        </Link>

    </BottomNavigation>

);

export default Navigation;
