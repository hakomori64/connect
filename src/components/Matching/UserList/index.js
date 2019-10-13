import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../../Firebase';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_icon_ref: ,
            default_icon_ref: this.props.firebase.storage.ref('users/default.png'),
            icon_url: null,
        }
    }

    componentDidMount() {

    }

    render() {
        return ();
    }
}

export default withFirebase(UserList);
