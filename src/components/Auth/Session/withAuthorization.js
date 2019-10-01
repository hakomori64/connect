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
            this.state = {
                users_ref: users_ref,
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