import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users_list: [],
            have_user_ids: [],
            want_user_ids: [],
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
            console.log("here");
            this.props.firebase.store
            .collection('users')
            .doc(nextProps.authUser.userID)
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

        if (nextState.have_user_ids.length && nextState.want_user_ids.length && (!this.state.have_user_ids.length || !this.state.want_user_ids.length)) {
            console.log(nextState.have_user_ids + " " + nextState.want_user_ids);
            console.log(nextState.have_user_ids.filter(value => nextState.want_user_ids.includes(value)));
            this.setState({
                users_list: nextState.have_user_ids.filter(value => nextState.want_user_ids.includes(value))
            });
            //console.log("selected users list: " + this.state.users_list);
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
                        console.log(users_set);
                    } else if (target === 'want') {
                        users_set = users_set.concat(doc.data().want);
                        console.log(users_set);
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


    render() {
        return (
            <div>
                {this.state.users_list.map((user_id, index) => (
                    <li key={user_id}>{user_id}</li>
                ))}
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Search);
