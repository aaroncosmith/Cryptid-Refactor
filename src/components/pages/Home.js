import React from 'react'
import styled from "styled-components";
import Background from './images/Cryptid.png'
import { createGlobalStyle } from 'styled-components'
import { useHistory } from "react-router-dom";


const Home = () => {
    let history = useHistory();

    function handleClick() {
        history.push("/chat");
    }
    return (

        <Container>
            <GlobalStyle />
            <InnerContainer>
                <ButtonWrapper>
                    <JoinButton onClick={handleClick}>Open Cryptid</JoinButton>
                </ButtonWrapper>
                <OutterContainer>
                    <CryptidInfo><p> Cryptid chat is great for quick conversations, in a secure location
        between clients.</p></CryptidInfo>

                </OutterContainer>
                <Logo />
            </InnerContainer>

        </Container>
    )


}

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }`


const OutterContainer = styled.div`
display: flex;
justify-content: center;
height: 40vh;
`;

const Container = styled.div`
height: 100%;
width: 100%;
`;

const InnerContainer = styled.div`
display: flex;
justify-content:center;
align-items:center;
height: 100%;
width: 100%;

position: absolute;
`;

const Logo = styled.div`
height: 100px;
width: 550px;
background-image: url(${ Background});
margin-right: 34vw;
background-repeat: no-repeat;
`

const CryptidInfo = styled.h2`
color: white;
font-family: 'Montserrat', sans-serif;
padding: 2px;
margin: 2px;
`

const JoinButton = styled.button`

/* Adapt the colors based on primary prop */
background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const ButtonWrapper = styled.div`
display: flex;
height: 30px;
width: 200px;
margin-top: 100px;
margin-left: 53px;
padding: auto;
justify-content: center;
align-items: center;
position: absolute;
`
export default Home;