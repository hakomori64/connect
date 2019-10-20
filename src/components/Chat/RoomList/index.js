import React from 'react';
import { withAuthorization } from '../../Auth/Session';
import {
    Link,
} from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Container from '@material-ui/core/Container';


const styles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
  
  


class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms_info: {},
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.authUser && !this.props.authUser) {
            console.log(nextProps.authUser);
            nextProps.authUser.room_ids.forEach(room_id => {
                this.props.firebase.store.collection('rooms').doc(room_id).get().then(doc => {
                    const messages_ref = doc.ref.collection('messages');
                    messages_ref.orderBy('timestamp', 'desc')
                        .onSnapshot(messageSnapshot => {
                            const { rooms_info } = this.state;
                            rooms_info[room_id] = {};
                            rooms_info[room_id].name = doc.data().name;
                            if (messageSnapshot.docs.length > 0) {
                                rooms_info[room_id].latest_message = messageSnapshot.docs[0].data();
                            }
                            this.setState({rooms_info});
                        });
                });
            });
        }

        return true;
    }

    render() {
        return (
            <div>
                <Container>
                {Object.entries(this.state.rooms_info) ? Object.keys(this.state.rooms_info).map(room_id => (
                    <span key={room_id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Link to={`/rooms/${room_id}`}>
                                    <MeetingRoomIcon />
                                </Link>
                    
                            </ListItemAvatar>
                            <ListItemText
                                primary={this.state.rooms_info[room_id].name}
                                secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={styles.inline}
                                        color="textPrimary"
                                    >
                                        Last Comment 
                                    </Typography>
                                    {" — "}
                                    {this.state.rooms_info[room_id].latest_message ? this.state.rooms_info[room_id].latest_message.content : null}
                                </React.Fragment>
                            }
                        />
                        </ListItem>
                        <Divider variant="inset" /> 
                        </span>
                )) : null}
                </Container>
            </div>
        )
    }
}



const condition = authUser => !!authUser;
export default withAuthorization(condition)(RoomList);