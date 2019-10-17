import React from 'react';
import { PasswordForgetForm } from '../Auth/PasswordForget';
import PasswordChangeForm from '../Auth/PasswordChange';
import { withAuthorization } from '../Auth/Session';
import ChangeProfileForm from './ChangeProfileForm';
import AddHaveWantSet from './AddHaveWantSet';
import HaveWantSet from './HaveWantSet';


const AccountPage = props => {
    return (
        <div>
            <ChangeProfileForm />
            <HaveWantSet />
            <AddHaveWantSet />
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);