import React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import UserMessage from "../UserMessage";
import monster from "../monster3.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import InputAddon from '../InputAddon'




import { CTX } from '../Store'


const ChatBox = () => {
  const [textValue, changeTextValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');


  const { state, dispatch } = React.useContext(CTX);
  console.log(state.user)
  React.useEffect(() => {
    console.log(state.user)

    state.socket.on('message', function (msg) {
      console.log("chat message recieved")
      dispatch('RECEIVE_MESSAGE', msg);
    })
  }, [])
  
  let newUserName = ""
  const userNameChanger = e => {
    newUserName = e.target.value;
    console.log(newUserName);
  }
  const usernameCreator = (newUserName) => {
    dispatch('SET_USER_NAME', newUserName)
  };
  const submitPasswordHandler = async () => {
    console.log("SELECTED CHANNEL", state.selectedChannel)
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({channel: state.selectedChannel, password: passwordValue})
    }
    const response = await fetch('http://localhost:3001/login', requestOptions)

    if(response.status === 200) {
      dispatch('SET_USER_VALID')
    }
    setPasswordValue('');
    
    console.log('response',response)
  }



  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log("PRESSED")
      state.socket.emit('sent message', { from: state.user, msg: textValue, channel: state.selectedChannel });
      dispatch('RECEIVE_MESSAGE', { from: state.user, msg: textValue, channel: state.selectedChannel });
      changeTextValue('')
    }
  }

  const onChangeHandler = e => {
    changeTextValue(e.target.value);
  }
  
  const {isVerified, selectedChannel} = state;
  console.log(state)

  return (

    <Layout>
      <Sidebar />
      <Wrapper>
      {isVerified ?
        <InnerBoxWrapper>
          <InnerBox>
            <AllUserMessages>
              <UserMessage/>
            </AllUserMessages>
            <InputWrapper>
              <input
                label="Send a chat"
                onChange={onChangeHandler}
                value={textValue}
                onKeyPress={onKeyPressHandler}
              />
            </InputWrapper>
          </InnerBox>
        </InnerBoxWrapper>
      :
        selectedChannel ?
        <MyDiv>
          <WrapperLogin>
          <img src={monster} alt="monster logo"></img>
          <PleaseLogin>{selectedChannel}</PleaseLogin>
          <PleaseLoginInput
            value={passwordValue} 
            type="password"
            placeholder="Enter the password"
            onChange={(e)=>{
              setPasswordValue(e.target.value)
            }}
          />
          <PleaseLoginButton
            onClick={submitPasswordHandler}
          >Submit</PleaseLoginButton>
          <br></br>
          <SetUsernameLabel>You are: {state.user}</SetUsernameLabel>
          <SetUsernameInput 
            onChange={userNameChanger}
            placeholder="Change username"
          />
          <SetUsernameButton
            onClick={() => {
              usernameCreator(newUserName)}}
          >Submit</SetUsernameButton>
          </WrapperLogin>
        </MyDiv>
        
        :
        null
      }
      </Wrapper>
    </Layout>
  )
}

const AllUserMessages = styled.div`
  
`;

const MyDiv = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
`;

const WrapperLogin = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 30%;
  margin-top: 100px;
  color: white;
  font-size:48px;
  width: 100%;
  align-items: center;
  font-family:'Roboto',sans-serif;
`;

const PleaseLogin = styled.div`
padding-bottom: 20px;
font-family: 'Creepster', cursive;
`;

const PleaseLoginInput = styled.input`
  width: 200px;
  height: 20px;
  font-size: 18px;
  text-align: center;
  font-family:'Roboto',sans-serif;
`;

const PleaseLoginButton = styled.button`
  align-items: center;
  display:inline-block;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  margin:0 0.3em 0.3em 0;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color: black;
  text-align:center;
  transition: all 0.2s;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 5px 32px;
  width: 200px;

  &:hover {
    background-color: #b60a1c;
    color: white;
  }
`;

const SetUsernameLabel = styled.div`
  font-family: 'Creepster', cursive;
`;

const SetUsernameInput = styled.input`
  width: 200px;
  height: 20px;
  font-size: 18px;
  text-align: center;
`;

const SetUsernameButton = styled.button`
  align-items: center;
  display:inline-block;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  margin:0 0.3em 0.3em 0;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color: black;
  text-align:center;
  transition: all 0.2s;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 5px 32px;
  width: 200px;

  &:hover {
    background-color: #b60a1c;
    color: white;
  }
`;

const Layout = styled.section`
      height: 100vh;
      margin: 0;
      border-radius: 15px !important;
      background-color: #b60a1c;
      display: flex;
    `;

const Wrapper = styled.section`
  margin-top: auto;
  margin-bottom: auto;
  height:100%;
  /* padding: 0.75rem 0 !important; */
  overflow-y: auto;
  white-space: nowrap;
  border-radius: 15px 15px 0 0 !important;
  border-bottom: 0 !important;
  width: 100%;
  margin-left: 1vw;
  margin-right: 15vw;
`;

const InnerBox = styled.section`
    text-align: center;
    width: 100%;
    align-self: flex-end;
    `;

const InnerBoxWrapper = styled.section`
      display: flex;
      height: 90vh;
      background: black;
      opacity: 0.5;
    
    `;

const InputWrapper = styled.div`
display: flex;
justify-content: center;
    `

// const InputAddons = styled.div`
// margin-right: 3px;
// height: 16px;
// width: 14px;
// color: white;
//     `;


const MessageBox = styled.input``;
export default ChatBox;