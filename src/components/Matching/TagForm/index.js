import React from 'react';
import { withFirebase } from '../../Firebase';
import withAuthorization from '../../Auth/Session/withAuthorization';
import Search from '../Search';

class TagForm extends React.Component {
    componentDidMount() {
        const user_status = this.props.authUser;
        const items = this.props.firebase.store
            .collection('users')
            .doc(user_status.userID)
            .collection('have_want_set');

        this.state = {
            items: items,
            value: '',
        }

        this.props.firebase.store.collection('users')
            .doc(user_status.userID)
            .collection('have_want_set')
            .onSnapshot(
                querySnapshot => {
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
        const options = this.state.items.map(i => {
            return (
                <option key={i} 
                        value={i}>
                {i}
                </option>);
        });
        return (
            <div>
                <form onSubmit={event => this.handleSubmit(event)}>
                <select
                    value={this.state.value}
                    onChange={event => this.handleChange(event)}
                >
                    {options}
                </select>
                <input type='submit' />
                </form>
                <Search selected_set_id={this.state.value} />
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withFirebase(TagForm);
