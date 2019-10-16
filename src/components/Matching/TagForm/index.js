import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';
import Search from '../Search';
import Select from 'react-select';


class TagForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            have_want_sets: [],
            value: '',
        }
    }

    load_have_want_sets = authUser => {
        this.props.firebase.store.collection('users')
        .doc(authUser.userID)
        .collection('have_want_set')
        .onSnapshot(
            querySnapshot => {
                const have_want_sets = [];
                querySnapshot.forEach(doc => {
                    have_want_sets.push(doc.id);
                });
                console.log(have_want_sets);
                this.setState({
                    have_want_sets: have_want_sets,
                    value: have_want_sets[0],
                });
            }
        );
    }

    componentDidMount() {
        if (this.props.authUser) {
            this.load_have_want_sets(this.props.authUser);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.authUser && !this.props.authUser) {
            this.load_have_want_sets(nextProps.authUser);
        }

        return true;
    }

    handleChange = selectedOption => {
        let value = "";
        if (selectedOption) {
            value = selectedOption.label;
        }
        this.setState({
            value: value,
        });
    }

    render(){
        const options = this.state.have_want_sets.map(have_want_set => {
            return (
                {
                    value: have_want_set,
                    label: have_want_set,
                }
            );
        });
        const selectedItem = {
            label: this.state.value,
            value: this.state.value,
        }
        return (
            <div>
                <Select
                    value={selectedItem}
                    options={options}
                    onChange={this.handleChange}
                />
                {this.props.authUser && this.state.value ? <Search key={this.props.authUser} selected_set_id={this.state.value} /> : <div>No Matched Users</div>}
            </div>
        );
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(TagForm);
