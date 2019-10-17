import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import withAuthorization from '../../Auth/Session/withAuthorization';
import Request from '../Request';


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#eeeeee',
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users_list: [],
            users_info: [],
            have_user_ids: [],
            want_user_ids: [],
            show_popup: false,
        };
    }

    componentDidMount() {
        if (this.props.authUser) {
            this.props.firebase.store
            .collection('users')
            .doc(this.props.authUser.userID)
            .collection('have_want_set')
            .doc(this.props.selected_set_id)
            .get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    this.getUserIDs(data.have, 'want');
                    this.getUserIDs(data.want, 'have');
                }
            });
        }

        if (this.state.have_user_ids && this.state.want_user_ids) {
            this.setState({
                users_list: this.state.have_user_ids.filter(value => this.state.want_user_ids.includes(value))
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.authUser && !this.props.authUser) {
            this.props.firebase.store
            .collection('users')
            .doc(nextProps.authUser.userID)
            .collection('have_want_set')
            .doc(this.props.selected_set_id)
            .get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    if (!('have' in data)) data.have = [];
                    if (!('want' in data)) data.want = [];
                    this.getUserIDs(data.have, 'want');
                    this.getUserIDs(data.want, 'have');
                }
            });
        }

        if (nextState.have_user_ids.length && nextState.want_user_ids.length && (!this.state.have_user_ids.length || !this.state.want_user_ids.length)) {
            console.log(nextState.have_user_ids + " " + nextState.want_user_ids);
            console.log(nextState.have_user_ids.filter(value => nextState.want_user_ids.includes(value)));
            this.setState({
                users_list: nextState.have_user_ids.filter(value => nextState.want_user_ids.includes(value))
            });
            //console.log("selected users list: " + this.state.users_list);
        }

        if (nextState.users_list.length && !this.state.users_list.length) {
            nextState.users_list.forEach((value, index) => {
                this.props.firebase.getUserInfo(
                    user_info => {
                        const { users_info } = this.state;
                        users_info.push(user_info);
                        this.setState({users_info});
                    },
                    () => {},
                )(value)
            });
        }

        return true;
    }

    getUserIDs = (tag_ids, target) => {
        // receives tag_ids and returns users who has one of them

        this.props.firebase.store.collection('tags').onSnapshot(querySnapshot => {
            let users_set = [];
            querySnapshot.forEach(doc => {
                if (tag_ids.includes(doc.id)) {
                    if (target === 'have') {
                        users_set = users_set.concat(doc.data().have);
                    } else if (target === 'want') {
                        users_set = users_set.concat(doc.data().want);
                    }
                }
            });

            console.log("users_set" + users_set + " " + target);

            if (target === 'have') {
                this.setState({
                    have_user_ids: Array.from(new Set(users_set)),
                });
            } else if (target === 'want') {
                this.setState({
                    want_user_ids: Array.from(new Set(users_set)),
                });
            }
        });
    }

    togglePopup = user_info => {
        if (!this.state.show_popup) {
            this.setState({
                selected_user_info: user_info
            })
        }
        this.setState({
            show_popup: !this.state.show_popup,
        });
    }

    render() {
        let candidates = <div>Now Loading Candidates...</div>
        if (this.state.users_info.length) {
            candidates = (
                <div styles={styles.root}>
                    <GridList cellHeight={180} styles={styles.gridList}>
                        {this.state.users_info.map(user_info => (
                            <GridListTile key={user_info.icon_url} >
                                <img src={user_info.icon_url} alt={user_info.icon_url} />
                                <GridListTileBar 
                                    title={user_info.username}
                                    subtitle={<span>by: {user_info.email}</span>}
                                    actionIcon={
                                        <IconButton arial-label={`info about ${user_info.username}`} styles={styles.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>

                </div>
            );
        }
        return (
            <div>
                {candidates}
                {this.state.show_popup ? <Request closePopup={this.togglePopup.bind(this)} user_info={this.state.selected_user_info} set_id={this.props.selected_set_id} /> : null}
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Search);
