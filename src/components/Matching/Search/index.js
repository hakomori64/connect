import React from 'react';
import { withFirebase } from '../../Firebase';
import withUserInfo from '../../Auth/Session/withUserInfo';
import { compose } from 'recompose';

class Search extends React.Component {
    const user_id = this.props.user_info;
    construnctor(props) {
        super(props);
        this.componentWillMount.bind(this);

        this.componentDidMount.bind(this);
    }

    componentWillMount.bind() {
        const user_set = this.props.firebase.store
            .collection('users')
            .doc(this.props.userID)
            .collection('have_want_set');
    }

    componentDidMount() {
        
    }

    render() {
        return (
            
        );
    }
}

export default compose(withFirebase, withUserInfo)(Search);
