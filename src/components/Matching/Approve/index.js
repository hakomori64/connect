import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'

const styles = makeStyles(theme => ({
    root: {
        with: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

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

    handleApproval = request_info => {
        this.props.firebase.store.collection('requests').doc(request_info.id).delete();
        this.props.authUser.connect_request = this.props.authUser.connect_request.filter(request_id => request_id !== request_info.id);
        this.props.firebase.store.collection('users').doc(this.props.authUser.userID).update({
            connect_request: this.props.authUser.connect_request,
        });
        this.props.firebase.store.collection('rooms').add({
            name: request_info.room_name,
            members: [this.props.authUser.userID, request_info.from.userID],
        }).then(room_ref => {
            [this.props.authUser.userID, request_info.from.userID].forEach(user_id => {
                const user_ref = this.props.firebase.store.collection('users').doc(user_id);
                this.props.firebase.store.runTransaction(transaction => {
                    return transaction.get(user_ref).then(user_doc => {
                        if (!user_doc.exists) return;
                        const user_room_ids = user_doc.data().room_ids;
                        user_room_ids.push(room_ref.id);
                        transaction.update(user_ref, {room_ids: user_room_ids});
                    });
                }).catch(error => {
                    console.log("Transaction failed: ", error);
                });
            });
        });
        let { requests_info } = this.state;
        requests_info = requests_info.filter(value => request_info.id !== value.id);
        this.setState({
            requests_info: requests_info,
        });
    }

    render() {
        let request_list = this.state.no_requests ? <div>No Requests</div> : <div>Now Loading...</div>;
        if (this.state.requests_info.length) {
            request_list = this.state.requests_info.map(request_info => (
                <span key={request_info.id}>
                    <ListItem alignItems="flex-start" dense button onClick={event => this.handleApproval(request_info)}>
                        <ListItemAvatar>
                            <Avatar alt={request_info.from.username} src={request_info.from.icon_url} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={request_info.from.username}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={styles.inline}
                                        color="textPrimary"
                                    >
                                        {request_info.from.username}さんがあなたに友達リクエストを送信しました。
                                    </Typography>
                                    {"承認"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" /> 
                </span>
            ))
            console.log(request_list);
        }
        return (
            <List className={styles.root}>
                {request_list}
            </List>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Approve);
