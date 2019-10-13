import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../../Firebase';



const Container = styled.div`
display: grid;
grid-template-columns: 60px auto;
grid-template-rows: 30px auto;
`;
const Thumbnail = styled.div`
grid-row: 1/3;
grid-column: 1/2;
`;

const Img = styled.img`
height: 50px;
width: 50px;
`;

const Header = styled.div`
grid-column:2/3;
grid-row:1/2;
`;
const Sentence = styled.div`
grid-column:2/3;
grid-row:2/3;
`;


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_icon_ref: this.props.firebase.storage.ref(`users/${this.props.message.left_user_id}/icon`),
            default_icon_ref: this.props.firebase.storage.ref('users/default.png'),
            icon_url: null,
        }
    }

    componentDidMount() {
        const { user_icon_ref, default_icon_ref } = this.state;
        user_icon_ref.getDownloadURL().then(url => {
            this.setState({
                icon_url: url
            });
        }).catch(error => {
            if (error.code === 'storage/object-not-found') {
                default_icon_ref.getDownloadURL().then(url => {
                    this.setState({
                        icon_url: url
                    });
                });
            }
        })
    }

    render() {
        return (
            <Container>
                <Thumbnail>
                    <Img src={this.state.icon_url} alt={this.props.message.left_by} />
                </Thumbnail>
                <Header>
                    {this.props.message.left_by}
                    {this.props.message.timestamp.toString()}
                </Header>
                <Sentence>
                    {this.props.message.content}
                </Sentence>
            </Container>

        )
    }
}

export default withFirebase(Message);
