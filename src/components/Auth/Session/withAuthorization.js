import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase} from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import { AuthUserContext } from '.';


const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        constructor(props) {
            super(props);
            const users_ref = this.props.firebase.store.collection('users');
            const images_ref = this.props.firebase.storage.ref('users');
            this.state = {
                users_ref: users_ref,
                images_ref: images_ref,
            }

            this.componentDidMount.bind(this);
            this.componentWillUnmount.bind(this);
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    } else {
                        this.state.users_ref.doc(authUser.uid).get()
                            .then(doc => {
                                this.setState({
                                    authUser: doc.data(),
                                });
                            });
                        const icon_ref = this.state.images_ref.child(`${authUser.uid}/icon.png`);
                        icon_ref.getDownloadURL().then(url => {
                            const user_data = this.state.authUser;
                            user_data.icon_url = url;
                            this.setState({
                                authUser: user_data,
                            });
                        }).catch(error => {
                            switch(error.code) {
                                case 'storage/object-not-found':
                                    const icon_ref = this.state.images_ref.child('default.png');
                                    icon_ref.getDownloadURL().then(url => {
                                        const user_data = this.state.authUser;
                                        user_data.icon_url = url;
                                        this.setState({
                                            authUser: user_data,
                                        });
                                    })
                                    break;
                                default:
                                    return;
                            }
                        });
                    }
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} authUser={this.state.authUser} /> : null
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthorization);
};

export default withAuthorization;