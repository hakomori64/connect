import React from 'react';
import { UserInfoContext } from '.';

const withUserInfo = Component => props => (
    <UserInfoContext.Consumer>
        {user_info =>
             <Component {...props} user_info={user_info} />
        }
    </UserInfoContext.Consumer>
)

export default withUserInfo;