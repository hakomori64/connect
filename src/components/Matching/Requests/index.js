import React from 'react';
import { withFirebase } from '../../Firebase';
import withAuthorization from '../../Auth/Session/withAuthorization';
import { compose } from 'recompose';

class Requests extends React.Component {

}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Search);
