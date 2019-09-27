import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => ( // 受け取ったpropsからfirebaseだけ抜き取る
    <button type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
)

export default withFirebase(SignOutButton);