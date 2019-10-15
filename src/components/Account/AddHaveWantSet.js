import React from 'react';
import Select from 'react-select';
import { withAuthorization } from '../Auth/Session';


class AddHaveWantSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            have_ids: [],
            want_ids: [],
            set_name: "",
            description: "",
        };
    }

    componentDidMount() {
        this.props.firebase.store.collection('tags').onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                const { tags } = this.state;
                tags[doc.id] = doc.data();
                if (!("have" in tags[doc.id])) tags[doc.id].have = [];
                if (!("want" in tags[doc.id])) tags[doc.id].want = [];
                this.setState({tags});
            });
        });
    }

    handleNameChange = event => {
        this.setState({set_name: event.target.value});
    }

    handleHaveChange = selectedOptions => {
        if (!selectedOptions) selectedOptions = [];
        this.setState({have_ids: selectedOptions.map(option => option.value)});
    }

    handleWantChange = selectedOptions => {
        if (!selectedOptions) selectedOptions = [];
        this.setState({want_ids: selectedOptions.map(option => option.value)});
    }

    handleDescriptionChange = event => {
        this.setState({description: event.target.value});
        console.log(this.state.description);
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.firebase.store.collection('users').doc(this.props.authUser.userID).collection('have_want_set').doc(this.state.set_name).set({
            have: this.state.have_ids,
            want: this.state.want_ids,
            description: this.state.description,
        });

        const { tags } = this.state;
        this.state.have_ids.forEach(have_id => {
            tags[have_id].have.push(this.props.authUser.userID);
            tags[have_id].have = Array.from(new Set(tags[have_id].have));
            this.props.firebase.store.collection('tags').doc(have_id).set(tags[have_id]);
        });
        this.state.want_ids.forEach(want_id => {
            tags[want_id].want.push(this.props.authUser.userID);
            tags[want_id].want = Array.from(new Set(tags[want_id].want));
            this.props.firebase.store.collection('tags').doc(want_id).set(tags[want_id]);
        });
        this.setState({
            error: false,
            set_name: "",
            description: "",
            have_ids: [],
            want_ids: [],
            tags: tags,
        });
    }

    render() {
        const options = [];
        Object.keys(this.state.tags).forEach(key => {
            options.push({value: key, label: key});
        });
        const selectedHaveOptions = this.state.have_ids.map(have_id => ({
            value: have_id,
            label: have_id
        }));

        const selectedWantOptions = this.state.want_ids.map(want_id => ({
            value: want_id,
            label: want_id,
        }));

        return (
            <div>
                <div>Please fill out the form below</div>
                <form onSubmit={this.handleSubmit}>
                    <div>NAME</div>
                    <input type="text" onChange={this.handleNameChange} />
                    <div>HAVE</div>
                    <Select 
                        value={selectedHaveOptions}
                        options={options}
                        isMulti={true}
                        onChange={this.handleHaveChange}
                    />
                    <div>WANT</div>
                    <Select 
                        value={selectedWantOptions}
                        options={options}
                        isMulti={true}
                        onChange={this.handleWantChange}
                    />
                    <div>description</div>
                    <textarea value={this.state.description} cols="30" rows="10" onChange={this.handleDescriptionChange}></textarea>
                    <button
                        type="submit"
                        onClick={this.handleSubmit}
                        disabled={!(this.state.set_name && this.state.have_ids.length && this.state.want_ids.length && this.state.description)}
                    >
                        セットを送信する
                    </button>
                </form>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AddHaveWantSet);