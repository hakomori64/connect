import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';
import Search from '../Search';


class TagForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            value: '',
        }
    }

    componentDidMount() {
        if (this.props.authUser) {
            this.props.firebase.store.collection('users')
                .doc(this.props.authUser.userID)
                .collection('have_want_set')
                .onSnapshot(
                    querySnapshot => {
                        const items = [];
                        querySnapshot.forEach(doc => {
                            items.push(doc.id);
                        });
                        console.log(items);
                        this.setState({
                            items: items,
                        });
                        if (items.length > 0) {
                            this.setState({
                                value: items[0],
                            });
                        }
                    }
                );
        }
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
                <option
                    key={i} 
                    value={i}>
                {i}
                </option>
            );
        });
        console.log(this.state.value);
        return (
            <div>
                <form onSubmit={event => this.handleSubmit(event)}>
                <select
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {options}
                </select>
                <input type='submit' />
                </form>
                {this.props.authUser && this.state.value ? <Search key={this.props.authUser} selected_set_id={this.state.value} /> : <div>Loading....</div>}
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(TagForm);
