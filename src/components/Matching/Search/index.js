import React from 'react';
import { withFirebase } from '../../Firebase';
import withAuthorization from '../../Auth/Session/withAuthorization';
import { compose } from 'recompose';

class Search extends React.Component {
    const user_status = this.props.authUser;

    constructor(props) {
        super(props);
        const user_set = this.props.firebase.store
            .collection('users')
            .doc(this.props.user_status.userID)
            .collection('have_want_set');

        this.state = {
            tags_list: this.props.firebase.store.collection('tags'),
            my_name: this.props.username,
            my_set: user_set,
        }
    }

    handleSearch(set) {
        this.state.tags_list.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc);
            }
        }

        return { user_list: };
    }

    select_set(set_id) {
        const selected_set = this.state.my_set.set_id;
        return selected_set;
    }

    componentDidMount() {
        const set = selectedSet(set_id);
        this.setState(handleSearch(set));
    }

    render() {
        return (
            
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Search);
