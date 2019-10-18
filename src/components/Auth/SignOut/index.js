import React from 'react';
import { withFirebase } from '../../Firebase';
import ExitToApp from '@material-ui/icons/ExitToApp';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const SignOutButton = ({ firebase }) => ( // 受け取ったpropsからfirebaseだけ抜き取る
<BottomNavigation>
    <BottomNavigationAction label="ExitToApp" value="exittoapp" icon={<ExitToApp />} onClick={firebase.doSignOut}/>
</BottomNavigation>
)

export default withFirebase(SignOutButton);