import React from 'react';
import { PasswordForgetForm } from '../Auth/PasswordForget';
import PasswordChangeForm from '../Auth/PasswordChange';
import { withAuthorization } from '../Auth/Session';
import withUserInfo from '../Auth/Session/withUserInfo';


const AccountPage = props => {
    const message = !props.user_info ? <div>Loading...</div> : <div>{props.user_info.email}</div>;
    return (
        <div>
            {message}
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withUserInfo(AccountPage));