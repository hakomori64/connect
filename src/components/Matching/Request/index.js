import React from 'react';
import { withFirebase } from '../../Firebase';
import withAuthorization from '../../Auth/Session/withAuthorization';
import { compose } from 'recompose';

/**
 * This component should be used as below
 * <Request user_id={user_id} />>
 */
class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_info: null,
        };
    }

    componentDidMount() {
        const user_id = this.props.user_id;
        this.props.firebase.store.collection('users').doc(user_id)
            .onSnapshot(doc => {
                const icon_ref = this.props.firebase.storage.ref(`users/${user_id}/icon`);
                icon_ref.getDownloadURL().then(url => {
                    const user_info = doc.data();
                    user_info.icon_url = url;
                    this.setState({
                        user_info: user_info,
                    });
                }).catch(error => {
                    if (error.code === 'storage/object-not-found') {
                        const icon_ref = this.storage.ref('users/default.png');
                        icon_ref.getDownloadURL().then(url => {
                            const user_info = doc.data();
                            user_info.icon_url = url;
                            this.setState({
                                user_info: user_info,
                            });
                        });
                    }
                });
            });
    }

    render() {
        let user_info = null;
        if (this.state.user_info) {
            user_info = (
                <div>
                    <img src={this.state.user_info.icon_url} alt={this.state.user_info.username} />
                    <div>user_name: {this.state.user_info.username}</div>
                    <div>email: {this.state.user_info.email}</div>
                    <div>description: </div>
                    <div>{this.state.user_info.description}</div>
                </div>
            )
        }
        return (

        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Request);
