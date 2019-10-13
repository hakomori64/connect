import React from 'react';
import { withFirebase } from '../../Firebase';
import withAuthorization from '../../Auth/Session/withAuthorization';

class TagForm extends React.Component {
    constructor(props) {
        super(props);
        const user_status = this.props.authUser;
        const items = this.props.firebase.store
            .collection('users')
            .doc(user_status.userID)
            .collection('have_want_set');

        this.state = {
            items: items,
            value: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const user_status = this.props.authUser;
        this.props.firebase.store.collection('users')
            .doc(user_status.userID)
            .collection('have_want_set')
            .onSnapshot(
                querySnapthot => {
                    const firstElementData = querySnapshot.docs[0].data();
                    this.setState(firstElementData);
                }
            );
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit(event)}>
                <select
                    value={this.state.value}
                    onChange={event => this.handleChange(event)}
                >
                    {options}
                </select>
                <input type='submit' />
                </form>
                <div>
                    <Search selected_set_id={this.state.value} />
                </div>
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withFirebase(TagForm);
