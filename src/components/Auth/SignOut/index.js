import React from 'react';
import { withFirebase } from '../../Firebase';
import ExitToApp from '@material-ui/icons/ExitToApp';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';

const FabPosision = styled.div`
position: relative;
width: 56px;
height: 56px;
`;


const ButtonShadow = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
text-decoration: none;
width:70px;
height:70px;
border-radius:50%;
text-align:center;
background:#f7f7f7;
box-shadow:inset 0 0 4px rgb(0,0,0,0.08);
`;

const SignOutButton = ({ firebase }) => ( // 受け取ったpropsからfirebaseだけ抜き取る
<BottomNavigation>
    {/* <BottomNavigationAction label="ExitToApp" value="exittoapp" icon={<ExitToApp />} onClick={firebase.doSignOut}/> */}
    <ButtonShadow>
        <FabPosision className={FabPosision}>
            <Fab color="default" aria-label="add" onClick={firebase.doSignOut}>
                <ExitToApp color="secondary"/>
            </Fab>
        </FabPosision>
    </ButtonShadow>
</BottomNavigation>
)

export default withFirebase(SignOutButton);