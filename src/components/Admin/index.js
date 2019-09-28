import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                <h1>Admin</h1>

                {loading && <div>Loading ...</div>}

                <UserTable users={users} />
            </div>
        )
    }
}

const UserTable = ({ users }) => (
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>E-Mail</th>
                <th>Username</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, key) => (
                <tr key={key}>
                    <td>{user.uid}</td><td>{user.email}</td><td>{user.username}</td>
                </tr>
            ))}
        </tbody>
    </table>
)

export default withFirebase(AdminPage);
