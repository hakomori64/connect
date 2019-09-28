import React from 'react';
import { PasswordForgetForm } from '../auth/PasswordForget';
import PasswordChangeForm from '../auth/PasswordChange';
import { AuthUserContext, withAuthorization } from '../auth/Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account: {authUser.email}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>

)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);