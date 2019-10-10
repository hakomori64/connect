import React, { Component } from 'react';
import { withAuthorization } from '../Auth/Session';

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
        this.props.firebase.store.collection("users").onSnapshot(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
                users.push(doc.data());
            });
            this.setState({
                users: users,
                loading: false,
            })
        });
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
                    <td>{user.userID}</td><td>{user.email}</td><td>{user.username}</td>
                </tr>
            ))}
        </tbody>
    </table>
)

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage);
