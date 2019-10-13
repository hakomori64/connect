import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags_list: this.props.firebase.store.collection('tags'),
            user_list: null,
        }
    }

    handleSearch(set) {
        //const have = this.props.selected_set_id.have;
        //const want = this.props.selected_set_id.want;

        //console.log("have: "+have);
        //console.log('want: '+want);
        console.log(this.props.selected_set_id);
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
