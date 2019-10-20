import React from 'react';
import styled from 'styled-components';

import PasswordChangeForm from '../Auth/PasswordChange';
import { withAuthorization } from '../Auth/Session';
import ChangeProfileForm from './ChangeProfileForm';
import AddHaveWantSet from './AddHaveWantSet';
import HaveWantSet from './HaveWantSet';
import Container from '@material-ui/core/Container';


const Grid = styled.div`
    display: grid;
    grid-template-columns: auto 20px 1fr;
    grid-template-rows: auto auto 1fr;
`;

const GridChangeProfileForm = styled.div`
    grid-column: 1/2;
    grid-row: 1/3;
`;

const GridHaveWantSet = styled.div`
    grid-column: 3/4;
    grid-row: 2/3;    
`;
const GridAddHaveWantSet = styled.div`

    grid-column: 3/4;
    grid-row: 1/2;
`;

const GridPasswordForgetForm = styled.div`
    grid-column: 1/4;
    grid-row: 3/4;
`;


const AccountPage = props => {
    return (
        <Container>
        <Grid>
            <GridChangeProfileForm>
                <ChangeProfileForm />
            </GridChangeProfileForm>
            <GridAddHaveWantSet>
                <AddHaveWantSet />
            </GridAddHaveWantSet>
            <GridHaveWantSet>
                <HaveWantSet />
            </GridHaveWantSet>
            <GridPasswordForgetForm>
                <h3>Password</h3>
                <PasswordChangeForm />
            </GridPasswordForgetForm>
        </Grid>
        </Container>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);