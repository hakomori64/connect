import React from 'react';
import { PasswordForgetForm } from '../Auth/PasswordForget';
import PasswordChangeForm from '../Auth/PasswordChange';
import { withAuthorization } from '../Auth/Session';
import withUserInfo from '../Auth/Session/withUserInfo';
import ChangeProfileForm from './ChangeProfileForm';


const AccountPage = props => {
    console.log(props.user_info);
    const message = props.user_info ? <div>{props.user_info.email}</div> : <div>Loading...</div>;
    const image = props.user_info ? <img src={props.user_info.icon_url} alt={props.user_info.username} width="200px" height="200px" /> : null;
    return (
        <div>
            {message}
            {image}
            <PasswordForgetForm />
            <PasswordChangeForm />
            <ChangeProfileForm />
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withUserInfo(AccountPage));