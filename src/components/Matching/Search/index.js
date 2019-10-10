import React from 'react';
import { withFirebase } from '../../Firebase';
import withUserInfo from '../../Auth/Session/withUserInfo';
import { compose } from 'recompose';

class Search extends React.Component {
    const user_id = this.props.user_info;
    construnctor(props) {
        super(props);
        const user_set = this.props.firebase.store
            .collection('users')
            .doc(this.props.userID)
            .collection('have_want_set');

        this.componentDidMount.bind(this);
    }

    getInitialState() {
        
    }

    componentDidMount() {
        
    }

    render() {
        return (
            
        );
    }
}

export default compose(withFirebase, withUserInfo)(Search);
