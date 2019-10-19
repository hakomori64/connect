import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../../Firebase';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
//import Typography from '@material-ui/core/Typography';

const ContainerChat = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-template-rows: 20px+auto auto;
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

const TimeFont = styled.span`
    font-style: italic;
    font-size:70%;
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
    getDateString = date => {
        const dateString =
            date.getUTCFullYear() + "/" +
            ("0" + (date.getUTCMonth() + 1)).slice(-2) + "/" +
            ("0" + date.getUTCDate()).slice(-2) + " " +
            ("0" + date.getUTCHours()).slice(-2) + ":" +
            ("0" + date.getUTCMinutes()).slice(-2) + ":" +
            ("0" + date.getUTCSeconds()).slice(-2);
        return dateString;
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <ContainerChat>
                        <Thumbnail>
                            <Img src={this.state.user_info ? this.state.user_info.icon_url : null} alt={this.props.message.left_by} />
                        </Thumbnail>
                        <Header>
                            {this.props.message.left_by}
                            {" "}
                            <TimeFont>
                                {this.getDateString(this.props.message.timestamp)}
                                {/* {this.props.message.timestamp.toString()} */}
                            </TimeFont>
                        </Header>
                        <Sentence>
                            {this.props.message.content}
                        </Sentence>
                    </ContainerChat>
                </Container>
            </React.Fragment>
        );
    }
}

export default withFirebase(Message);
