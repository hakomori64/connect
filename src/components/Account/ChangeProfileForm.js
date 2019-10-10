import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import withUserInfo from '../Auth/Session/withUserInfo';


class ChangeProfileForm extends React.Component {
    constructor(props) {
        super(props);
        const images_ref = this.props.firebase.storage.ref('users');
        this.state = {
            images_ref: images_ref,
            typing_description: null,
            icon_image_url: null,
        };
    }

    handleSubmit = event => {
        event.preventDefault();

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

    render() {
        const { image_preview_url } = this.state;
        const image_preview = !!image_preview_url ? (<img height="100px" width="100px" src={image_preview_url} alt="" />) : (<div>Please select an Image for Preview</div>);

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange} />
                    <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
                </form>
                <div>
                    {image_preview}
                </div>
            </div>
        )
    }

}

export default compose(withFirebase, withUserInfo)(ChangeProfileForm);