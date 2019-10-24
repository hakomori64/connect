import React from 'react';
import withAuthorization from '../Auth/Session/withAuthorization';


class HaveWantSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        let have_want_sets = <div>Now Loading...</div>
        if (this.props.authUser) {
            if (!(this.props.authUser.have_want_set)) {
                have_want_sets = <div>No Have Want Set</div>
            } else {
                have_want_sets = Object.keys(this.props.authUser.have_want_set).map(set_id => {
                    return (
                        <div key={set_id}>
                            <div>{set_id}</div>
                            {this.props.authUser.have_want_set[set_id].have.map(have_id => (<li key={have_id}>{have_id}</li>))}
                            {this.props.authUser.have_want_set[set_id].want.map(want_id => (<li key={want_id}>{want_id}</li>))}
                        </div>
                    )
                })
            }
        }
        return (
            <div>
                {have_want_sets}
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HaveWantSet);
