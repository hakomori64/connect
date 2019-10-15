import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';
import Search from '../Search';
import Select from 'react-select';


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
                    }
                );
        }
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
        const options = this.state.items.map(item => {
            return (
                {
                    value: item,
                    label: item
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
