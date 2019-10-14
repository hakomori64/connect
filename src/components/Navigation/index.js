import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import SignOutButton from '../Auth/SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Auth/Session';


const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const Container = styled.div`
    display: grid;
    grid-template-columns: 100px 100px 100px 100px 100px 100px 100px;
`;


const I_button = styled.div`
left: 10px;
display: inline-block;
position: relative;
text-decoration: none;
color: rgba(3, 169, 244, 0.54);
width: 100px;
height: 100px;
border-radius: 50%;
text-align: center;
background: #f7f7f7;
box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08);
content: '';
`;

const Home_button_icon = styled.span`
    
    top:20px;
    left:20px;
    width: 40px;
    height: 40px;
    display: block;
    position: relative;
    overflow: hidden;

    &::before{
        content: '';
        height: 18px;
        width: 12px;
        display: block;
        position: absolute;
        top: 16px;
        left: 5px;
        border: solid #2ca9e1;
        border-width: 3px 9px 1px 9px;
    }

    &::after {
        content: '';
        content: '';
        height: 0px;
        width: 0px;
        display: block;
        position: absolute;
        top: 2px;
        left: -10px;
        border: 12px transparent solid;
        border-width: 0 30px 15px;
        border-bottom-color: #2ca9e1;
    }
`;

const Search_button_icon = styled.span`
    top:20px;
    left: 20px;
    height: 40px;
    width: 40px;
    display: block;
    position: relative;

    &::before,
    &::after {
        content: '';
        height: 20px;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }

    &::before {
        width: 20px;
        border: 3px #68be8d solid;
        border-radius: 100%;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
    }

    &::after {
        width: 7px;
        background: #68be8d;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        top: 17px;
        left: 24px;
    }
`;


const Message_button_icon = styled.span`
    color: #68be8d;
    top:20px;
    right: 15px;
    position: absolute;
    
    margin-top: 4px;
    width: 45px;
    height: 30px;
    border-radius: 1px;
    border: solid 1px currentColor;
    background-color: currentColor;

    &::before {
        content: '';
        position: absolute;
        bottom:13px;
        left: 21px;
        width: 3px;
        height: 30px;
        color: white;
        background-color: currentColor;
        -webkit-transform-origin: bottom;
        transform-origin: bottom;
        -webkit-transform: rotate(-54deg);
        transform: rotate(-54deg);
        }

    &::after {
        content: '';
        position: absolute;
        bottom:13px;
        left: 21px;
        width: 3px;
        height: 30px;
        color: white;
        background-color: currentColor;
        -webkit-transform-origin: bottom;
        transform-origin: bottom;
        -webkit-transform: rotate(54deg);
        transform: rotate(54deg);
        }
`;

const Acount_button_icon = styled.div`
    position:relative;
     bottom: -30px;
     border-bottom: 40px solid #6CBB5A;
     border-left: 20px solid transparent;
     border-right: 20px solid transparent;
     height: 0;
     width: 20px;
        

`;

const M_face = styled.span`
    position: relative;
    bottom: -100px;
    right: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    line-height: 50px;
    background-color:#6CBB5A;

`;



const I_a = styled.div`
        position: absolute;
        content: '';
        width: 80px;
        height: 80px;
        line-height: 80px;
        left: 10px;
        top: 9px;
        border-radius: 50%;
        font-size: 40px;
        background-image: linear-gradient(#e8e8e8 0%, #d6d6d6 100%);
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.66);
        box-shadow: inset 0 2px 0 rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.19);
        border-bottom: solid 2px #b5b5b5;   
        &:active{
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 2px 2px rgba(0, 0, 0, 0.19);
    border-bottom: solid 2px #d8d8d8;
        }    
`;




const NavigationAuth = () => (
    <div>


        <Container>
            <I_button>
                <I_a>
                    <Link to={ROUTES.HOME}>
                        <Home_button_icon />
                    </Link>
                </I_a>
            </I_button>
            <I_button>
                <I_a>
                    <Link to={ROUTES.HOME}>
                        <Search_button_icon />
                    </Link>
                </I_a>
            </I_button>
            <I_button>
                <I_a>
                    <Link to={ROUTES.HOME}>
                        <Message_button_icon />
                    </Link>
                </I_a>
            </I_button>
            <I_button>
                <I_a>
                    <Link to={ROUTES.HOME}>
                        <Acount_button_icon>
                            
                        </Acount_button_icon>
                        <M_face></M_face>
                    </Link>
                </I_a>
            </I_button>
            <I_button>
                <I_a>
                    <Link to={ROUTES.ACCOUNT}>
                        <Message_button_icon />
                    </Link>
                </I_a>
            </I_button>


            <ul>
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>


                <li>
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                </li>
            </ul>
            <SignOutButton />
        </Container>
    </div>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);

export default Navigation;
