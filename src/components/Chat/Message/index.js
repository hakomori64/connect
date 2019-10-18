import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../../Firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
//import Typography from '@material-ui/core/Typography';

const Container_chat = styled.div`
display: grid;
grid-template-columns: 60px auto;
grid-template-rows: 20px auto;
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
            user_info: null,
        };
    }
    componentDidMount() {
        this.props.firebase.getUserInfo(
            user_info => this.setState({user_info}),
            () => this.setState({user_info: null}),
        )(this.props.message.left_user_id);
    }

    render() {
        return (
            <React.Fragment>
            <CssBaseline />
            <Container fixed>
            <Container_chat>
                <Thumbnail>
                    <Img src={this.state.user_info ? this.state.user_info.icon_url : null} alt={this.props.message.left_by} />
                </Thumbnail>
                <Header>
                    {this.props.message.left_by}
                    {this.props.message.timestamp.toString()}
                </Header>
                <Sentence>
                    {this.props.message.content}
                </Sentence>
            </Container_chat>
            </Container>
            </React.Fragment>
        );
    }
}

export default withFirebase(Message);
