
import React, {useEffect, useState} from "react";
import Card from './card.js';
import { Link } from 'react-router-dom';
import {DataContext} from '../context/contextFile.js';
import { loginDb } from "../server/api/user/get.js";
import {getUserProfile} from '../server/api/user/get.js';

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const {setLoggedIn, setId, operation,  setOperation} = React.useContext(DataContext);

  const [users, setUsers] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const getAllContacts = async () => {
    const allContacts = await getUserProfile();
    
    if(allContacts) {

        setUsers(allContacts);
        setInitialized(true);
    }
    
  };

  useEffect(()=>{
   getAllContacts();
   }, []);

  return (
    <Card
      txtcolor="black"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm 
        setShow={setShow} 
        setStatus={setStatus} 
        setLoggedIn={setLoggedIn} 
        users = {users}
        initialized = {initialized}
        setId = {setId}
        operation = {operation}
        setOperation = {setOperation}
        /> :
        <LoginMsg 
        setShow={setShow} 
        setStatus={setStatus} 
        setLoggedIn={setLoggedIn}
        
        />}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setLoggedIn(false);
        }
        }>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  
  const [email, setEmail]                 = React.useState('');
  const [isEmail, setIsEmail]       = React.useState(false);
  const [password, setPassword]           = React.useState('');
  const [isPassword, setIsPassword] = React.useState(false);
  const [userToAut, setUserToAut] = React.useState('');

  

  const handle = async event => {
    event.preventDefault();

  if( !isEmail ) {
    alert("This email does not exist.")
  } else if (!isPassword){
    alert("Wrong password.")
  } else {
      try {
        const { data } = await loginDb({ "Email": email, "Password": password})

        console.log(data)
      } catch (error) {

      }
        props.setLoggedIn(true);
        props.setShow(false);
        props.setOperation(props.operation + 1);
      }
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => {
        setEmail(e.currentTarget.value)

        if(props.initialized ){
          let destinationUser = (props.users.filter(item => (item.Email) === (e.target.value)))[0];
          console.log(destinationUser);
          if(destinationUser){
            setIsEmail(true);
            setUserToAut(destinationUser);
            props.setId(destinationUser._id);
            console.log(destinationUser);
            };
        }
    

      }
      }/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => {
        setPassword(e.currentTarget.value)

        if( userToAut.Password === e.currentTarget.value){
          setIsPassword(true);
        }
      
        }
        }/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    <Link className="btn btn-light" to="/CreateAccount">Sign up</Link>
   
  </>);
}

export default Login;