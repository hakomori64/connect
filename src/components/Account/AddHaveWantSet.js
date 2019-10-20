import React from 'react';
import styled from 'styled-components';

import Select from 'react-select';
import { withAuthorization } from '../Auth/Session';
import TextArea from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import DoneOutline from '@material-ui/icons/DoneOutline';

const TextAreaDesign = styled.div`
    border: 2px solid #0a0;  /* 枠線 */
    border-radius: 10%;   /* 角丸 */
    outline: none;
`;

const AddBox = styled.div`
    padding: 0.5em 1em;
    margin: 2em 0;
    color: #5d627b;
    background-color: white;
    border-top: solid 5px #5d627b;
    box-shadow: 0 3px 5px rgb(0, 0, 0, 0.22);
`;


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
                <AddBox>
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
                    <TextArea 
                        className={TextAreaDesign}
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
                    <IconButton
                        type="submit"
                        onClick={this.handleSubmit}
                        disabled={!(this.state.set_name && this.state.have_ids.length && this.state.want_ids.length && this.state.description)}
                    >
                     <DoneOutline />
                    </IconButton>
                </form>
                </AddBox>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AddHaveWantSet);