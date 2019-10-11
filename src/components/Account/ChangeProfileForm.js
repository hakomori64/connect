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
        const { file } = this.state;
        if (!file) return;
        this.state.images_ref.child(this.props.user_info.userID).child("icon").put(file)
            .then(snapshot => {
                const icon_ref = snapshot.ref;
                icon_ref.getDownloadURL().then(url => {
                    this.setState({
                        file: null,
                        image_preview_url: null,
                        icon_image_url: url,
                    });
                })
            })
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
        const { image_preview_url, icon_image_url } = this.state;
        let icon_image = null;
        if (icon_image_url) {
            icon_image = <img src={icon_image_url} alt="YOU" width="200px" height="200px" />;
        } else if (this.props.user_info) {
            icon_image = <img src={this.props.user_info.icon_url} alt={this.props.user_info.username} width="200px" height="200px" />;
        }
        const image_preview = !!image_preview_url ? (<img height="300px" width="300px" src={image_preview_url} alt="" />) : (<div>Please select an Image for Preview</div>);

        return (
            <div>
                {icon_image}
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