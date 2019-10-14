import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../../Firebase';

class UserList extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>Return User List...</div>
        );
    }
}

export default withFirebase(UserList);
