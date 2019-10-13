import React from 'react';
import { withFirebase } from '../../Firebase';
import withAuthorization from '../../Auth/Session/withAuthorization';
import { compose } from 'recompose';

class Search extends React.Component {

    constructor(props) {
        super(props);
        const user_status = this.props.authUser;

        this.state = {
            tags_list: this.props.firebase.store.collection('tags'),
            my_name: this.props.username,
        }
    }

    handleSearch(set) {
        this.state.tags_list.onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data());
            })
        });
        return {};
    }

    componentDidMount() {
        this.handleSearch(this.props.selected_set_id);
        //this.setState(handleSearch(set));
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Search);
