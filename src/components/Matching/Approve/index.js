import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';


class Approve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests_info: [],
            no_requests: true,
        };
    }

    loadRequestsInfo = authUser => {
        if (authUser.connect_request.length === 0) {
            return;
        }
        authUser.connect_request.forEach(request_id => {
            this.props.firebase.store.collection('requests').doc(request_id).get()
                .then(doc => {
                    if (!doc.exists) {
                        return;
                    }
                    const data = doc.data();
                    data.id = doc.id;
                    this.props.firebase.getUserInfo(
                        user_info => {
                            data.from = user_info
                            const { requests_info } = this.state;
                            requests_info.push(data)
                            this.setState({requests_info});
                        },
                        () => {},
                    )(data.from)
                });
        });
        this.setState({
            no_requests: false,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.authUser && !this.props.authUser) {
            this.loadRequestsInfo(nextProps.authUser);
        }
        return true;
    }

    render() {
        let request_list = this.state.no_requests ? <div>No Requests</div> : <div>Now Loading...</div>;
        if (this.state.requests_info.length) {
            request_list = this.state.requests_info.map(request_info => (
                <li key={request_info.id}>{request_info.from.username}さんあなたに友達リクエストを送信しました。</li>
            ))
            console.log(request_list);
        }
        return (
            <div>
                {request_list}
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Approve);