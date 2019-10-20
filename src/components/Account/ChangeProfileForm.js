import React from 'react';
import { withAuthorization } from '../Auth/Session';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DoneOutline from '@material-ui/icons/DoneOutline';

import { TextareaAutosize } from '@material-ui/core';

const FileUploader = styled.div`
    display: block;
    background: #ff7c7c;
    box-shadow: 0 3px #cb4848;
    -webkit-box-shadow: 0 3px #cb4848;
    border-bottom: 1px solid #ff7c7c;
    font-size: 16px;
`;
const ProfileBox = styled.div`
    transform: translateY(15px);
    padding: 0.5em;
    margin: 1em 0;
    background: #f4f4f4;
    border-left: solid 6px #5bb7ae;
    box-shadow: 0px 2px 3px rgb(0, 0, 0, 0.33);
`;


class ChangeProfileForm extends React.Component {
    constructor(props) {
        super(props);
        const images_ref = this.props.firebase.storage.ref('users');
        this.state = {
            images_ref: images_ref,
            typing_description: "",
            icon_image_url: null,
            loading: false,
            isDescriptionEditable: false,
        };
    }

    componentDidMount = event => {
        if (this.props.authUser) {
            this.setState({
                typing_description: this.props.authUser.description,
            });
        }
    }
//upload
    handleSubmit = event => {
        event.preventDefault();
        const { file } = this.state;
        if (!file) return;
        const uploadTask = this.state.images_ref.child(this.props.authUser.userID).child("icon").put(file);
        
        uploadTask.on(
            'state_changed', 
            snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                this.setState({
                    file: null,
                    image_preview_url: null,
                    loading: true,
                    progress: progress,
                });
            },
            error => {},
            () => {
                const icon_ref = uploadTask.snapshot.ref;
                icon_ref.getDownloadURL().then(url => {
                    this.setState({
                        loading: false,
                        progress: 0,
                        icon_image_url: url,
                    });
                });
            }
        );
    }

    handleImageChange = event => {
        event.preventDefault();
        const reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                image_preview_url: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    handleDescriptionChange = event => {
        const description = event.target.value;
        if (this.state.isDescriptionEditable) {
            this.setState({
                typing_description: description,
            });
        }
    }

    toggleEditable = event => {
        if (this.state.isDescriptionEditable) {
            // set description
            this.props.authUser.description = this.state.typing_description;
            this.props.firebase.store.collection('users').doc(this.props.authUser.userID).set({
                connect_request: this.props.authUser.connect_request,
                description: this.props.authUser.description,
                email: this.props.authUser.email,
                room_ids: this.props.authUser.room_ids,
                userID: this.props.authUser.userID,
                username: this.props.authUser.username,
            });
        } else {
            this.setState({
                typing_description: this.props.authUser.description,
            });
        }
        this.setState({
            isDescriptionEditable: !this.state.isDescriptionEditable
        });
    }

    render() {
        const { image_preview_url, icon_image_url } = this.state;
        let icon_image = null;
        if (icon_image_url) {
            icon_image = <img src={icon_image_url} alt="YOU" width="200px" height="200px" />;
        } else if (this.props.authUser) {
            icon_image = <img src={this.props.authUser.icon_url} alt={this.props.authUser.username} width="200px" height="200px" />;
        }
        const image_preview = !!image_preview_url ? (<img height="300px" width="300px" src={image_preview_url} alt="" />) : (<div>Please select an Image for Preview</div>);
        const progress = this.state.loading ? <div>Now Uploading Image : {Math.floor(this.state.progress)} %</div> : null;

        let description = "";
        if (this.state.isDescriptionEditable) {
            description = this.state.typing_description;
        } else if (this.props.authUser) {
            description = this.props.authUser.description
        }

        return (
            <div>
                <ProfileBox>
                {icon_image}
                {progress}
                <form onSubmit={this.handleSubmit}>
                <label 
                    for="file_upload"
                    className={FileUploader}
                    >
                        <input type="file" id="file_upload" onChange={this.handleImageChange}>
                    
                        </input>
                    <p>
                    <Button variant="outlined" color="primary" type="submit" onClick={this.handleSubmit}>Upload Image</Button>
                    </p>
                    </label>
                </form>
                <div>
                    {image_preview}
                </div>
                <div>
                    description:
                </div>
                
                <TextareaAutosize
                    value={description}
                    onChange={this.handleDescriptionChange}
                />
                
                <IconButton onClick={this.toggleEditable}>
                    <DoneOutline>
                        {this.state.isDescriptionEditable ? "Save" : "Edit"}
                    </DoneOutline>
                </IconButton>
                </ProfileBox>
            </div>
        )
    }

}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(ChangeProfileForm);