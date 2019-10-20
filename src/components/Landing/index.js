import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';


const BackGround = styled.div`
    @import url("https://fonts.googleapis.com/css?family=Montserrat:700");
    font-family: 'Montserrat', sans-serif;
    background-color: #0040C1;
    position: relative;
    height: 100vh;
    overflow: hidden;
`;

const BackGroundTitle = styled.div`
    color: #fff;
    position: fixed;
    top: 10%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    font-size: 50px;
    z-index: 1;
`;

const BackGroundCube = styled.div`
    position: absolute;
    top: 80vh;
    left: 45vw;
    width: 10px;
    height: 10px;
    border: solid 1px #003298
   ;
    -webkit-transform-origin: top left;
            transform-origin: top left;
    -webkit-transform: scale(0) rotate(0deg) translate(-50%, -50%);
            transform: scale(0) rotate(0deg) translate(-50%, -50%);
    -webkit-animation: cube 12s ease-in forwards infinite;
            animation: cube 12s ease-in forwards infinite;
   &:nth-child(2n) {
    border-color: #0051f4
   ;
   }
   &:nth-child(2) {
    -webkit-animation-delay: 2s;
            animation-delay: 2s;
    left: 25vw;
    top: 40vh;
   }
   
   &:nth-child(3) {
    -webkit-animation-delay: 4s;
            animation-delay: 4s;
    left: 75vw;
    top: 50vh;
   }
   &:nth-child(4) {
    -webkit-animation-delay: 6s;
            animation-delay: 6s;
    left: 90vw;
    top: 10vh;
   }
   &:nth-child(5) {
    -webkit-animation-delay: 8s;
            animation-delay: 8s;
    left: 10vw;
    top: 85vh;
   }
   &:nth-child(6) {
    -webkit-animation-delay: 10s;
            animation-delay: 10s;
    left: 50vw;
    top: 10vh;
   }
   @-webkit-keyframes cube {
    from {
      -webkit-transform: scale(0) rotate(0deg) translate(-50%, -50%);
              transform: scale(0) rotate(0deg) translate(-50%, -50%);
      opacity: 1;
    }
    to {
      -webkit-transform: scale(20) rotate(960deg) translate(-50%, -50%);
              transform: scale(20) rotate(960deg) translate(-50%, -50%);
      opacity: 0;
    }
   }@keyframes cube {
    from {
      -webkit-transform: scale(0) rotate(0deg) translate(-50%, -50%);
              transform: scale(0) rotate(0deg) translate(-50%, -50%);
      opacity: 1;
    }
    to {
      -webkit-transform: scale(20) rotate(960deg) translate(-50%, -50%);
              transform: scale(20) rotate(960deg) translate(-50%, -50%);
      opacity: 0;
    }
   }
`;

const Content = styled.div`
    width:30%;
    background-color:rgba(255,255,255,.8);
   border-radius:.25em;
   box-shadow:0 0 .25em rgba(0,0,0,.25);
   box-sizing:border-box;
   left:50%;
   padding:10vmin;
   position:fixed;
   text-align:center;
   top:50%;
   transform:translate(-50%, -50%);
   z-index: 1;
`;


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon_url: null,   
        };
    } 
    componentDidMount() {
        const icon_ref = this.props.firebase.storage.ref('icon.png');
        icon_ref.getDownloadURL().then(url => {
            this.setState({
                icon_url: url,
            })
        })
    }

    render() {
        return (
            
                 <BackGround>
        <BackGroundTitle>
            Landing Page
        </BackGroundTitle>
        <Content>
                Hello Connect!!
                {/* <img src={this.state.icon_url} alt="connect_logo"/>  */}

                <img src={this.state.icon_url} alt="connect_logo" style={{ width: '90%'}}/> 
                {/* <img src={this.state.icon_url} alt="connect_logo" width="400"/> */}
        </Content>
        <BackGroundCube />
        <BackGroundCube />
        <BackGroundCube />
        <BackGroundCube />
        <BackGroundCube />
        <BackGroundCube />
    </BackGround>
        )
    }
}

export default withFirebase(LandingPage);