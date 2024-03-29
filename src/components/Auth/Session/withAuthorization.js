import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase} from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import { AuthUserContext } from './context';


const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            }
        }
        componentDidMount() {
            this.auth = this.props.firebase.onAuthUserListener(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                    this.setState({
                        authUser
                    });
                },
                () => this.props.history.push(ROUTES.SIGN_IN),
            );
        }

        componentWillUnmount() {
            this.auth();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        (!!authUser && condition(authUser)) ? <Component {...this.props} authUser={this.state.authUser} /> : null
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