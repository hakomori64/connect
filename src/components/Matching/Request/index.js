import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';


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
        this.props.firebase.getUserInfo(
            user_info => this.setState({user_info}),
            () => this.setState({user_info: null}),
        )(this.props.user_id);
    }

    render() {
        let user_info = null;
        if (this.state.user_info) {
            user_info = (
                <div>
                    <img src={this.state.user_info.icon_url} alt={this.state.user_info.username} width="200px" height="200px" />
                    <div>user_name: {this.state.user_info.username}</div>
                    <div>email: {this.state.user_info.email}</div>
                    <div>description: </div>
                    <div>{this.state.user_info.description}</div>
                </div>
            )
        } else {
            user_info = (
                <div>Loading...</div>
            )
        }
        return (
            <div>{user_info}</div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Request);
