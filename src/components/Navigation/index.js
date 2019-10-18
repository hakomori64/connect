import React from 'react';

import { Link } from 'react-router-dom';
import SignOutButton from '../Auth/SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Auth/Session';
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

const NavigationAuth = () => (
    <div>
        <BottomNavigation>
            <Link to={ROUTES.LANDING}>
                <BottomNavigationAction label="FrightLand" value="flightland" icon={<FlightLandIcon />} />
            </Link>
            <Link to={ROUTES.HOME}>
                <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
            </Link>
            <Link to={ROUTES.ACCOUNT}>
                <BottomNavigationAction label="AccountBox" value="accountbox" icon={<AccountBoxIcon />} />
            </Link>
            <Link to={ROUTES.MATCHING}>
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon/>} />
            </Link>
            <Link to={ROUTES.APPROVE}>
                <BottomNavigationAction label="ContactMail" value="contactmail" icon={<ContactMailIcon/>} />
            </Link>
            <SignOutButton />
        </BottomNavigation>
    <ul>
        <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
    </ul>

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
