import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';
import styled from 'styled-components';

const PopUp = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
`

const PopupInner = styled.div`
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    border-radius: 20px;
    background: white;
`

/**
 * This component should be used as below
 * <Request user_id={user_id} closePopup={this.closePopup.bind(this)}/>>
 */
class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <PopUp>
                <PopupInner>
                    <img src={this.props.user_info.icon_url} alt={this.props.user_info.username} width="200px" height="200px" />
                    <div>user_name: {this.props.user_info.username}</div>
                    <div>email: {this.props.user_info.email}</div>
                    <div>description: </div>
                    <div>{this.props.user_info.description}</div>
                    <button onClick={this.props.closePopup}>close popup</button>
                </PopupInner>
            </PopUp>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Request);
