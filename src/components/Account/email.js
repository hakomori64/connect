import React from 'react';
import withUserInfo from '../Auth/Session/withUserInfo';


class EmailBase extends React.Component {
    
    render() {
        const message = !this.props.user_info ? <div>Loading...</div> : <div>{this.props.user_info.email}</div>;
        return (
            message
        );
    }
}

const Email = withUserInfo(EmailBase);

export default Email;