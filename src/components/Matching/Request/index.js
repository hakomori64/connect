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
    left: 10%;
    right: 10%;
    top: 10%;
    bottom: 10%;
    margin: auto;
    border-radius: 20px;
    background: white;
    overflow: hidden;
`

/**
 * This component should be used as below
 * <Request user_id={user_id} closePopup={this.closePopup.bind(this)} set_id={have_want_set_id} />>
 */
class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            have_want_set: {},
            matched_have_want_sets: [],
        };
    }

    loadHaveWantSet = authUser => {
        console.log(this.props.set_id);
        this.props.firebase.store
            .collection('users')
            .doc(authUser.userID)
            .collection('have_want_set')
            .doc(this.props.set_id)
            .get().then(doc => {
                this.setState({
                    have_want_set: doc.data(),
                });
                console.log(this.state.have_want_set);
            });
    }

    checkMatchedHaveWant = have_want_set => {
        const my_have_want_set = have_want_set;
        console.log(my_have_want_set);
        const candidate_have_want_set = this.props.user_info.have_want_set;
        console.log(candidate_have_want_set);
        Object.keys(candidate_have_want_set).forEach(set_name => {
            if (
                (candidate_have_want_set[set_name].have.filter(value => my_have_want_set.want)).length &&
                (candidate_have_want_set[set_name].want.filter(value => my_have_want_set.have)).length
            ) {
                console.log(candidate_have_want_set[set_name]);
                const { matched_have_want_sets } = this.state;
                matched_have_want_sets.push(candidate_have_want_set[set_name]);
                this.setState({matched_have_want_sets});
            };
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.authUser && !this.props.authUser) {
            this.loadHaveWantSet(nextProps.authUser);
        }

        if (Object.keys(nextState.have_want_set).length && !(Object.keys(this.state.have_want_set).length)) {
            this.checkMatchedHaveWant(nextState.have_want_set);
        }

        return true;
    }

    render() {
        let matched_set = <div>Loading Matched Sets ...</div>;
        if (this.state.matched_have_want_sets.length) {
            matched_set = this.state.matched_have_want_sets.map(set => (
                <div>
                    <div>
                        have:
                    </div>
                    <div>
                        {set.have.map(have => <li key={have}>{have}</li>)}
                    </div>
                    <div>
                        want:
                    </div>
                    <div>
                        {set.want.map(want => <li key={want}>{want}</li>)}
                    </div>
                </div>
            ))
        }
        return (
            <PopUp>
                <PopupInner>
                    <img src={this.props.user_info.icon_url} alt={this.props.user_info.username} width="200px" height="200px" />
                    <div>user_name: {this.props.user_info.username}</div>
                    <div>email: {this.props.user_info.email}</div>
                    <div>description: </div>
                    <div>{this.props.user_info.description}</div>
                    <div>マッチ内容:</div>
                    {matched_set}
                    <button onClick={this.props.closePopup}>close popup</button>
                </PopupInner>
            </PopUp>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Request);
