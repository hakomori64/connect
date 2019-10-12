import React from 'react';
import { PasswordForgetForm } from '../Auth/PasswordForget';
import PasswordChangeForm from '../Auth/PasswordChange';
import { withAuthorization } from '../Auth/Session';
import ChangeProfileForm from './ChangeProfileForm';


const AccountPage = props => {
    return (
        <div>
            <ChangeProfileForm />
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);