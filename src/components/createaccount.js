
import React, {useState, useEffect} from 'react';
import { useFormik } from "formik";
import { Formik } from 'formik';
import Card from './card.js';
import  {sendNewUser}  from '../server/api/user/post.js';
import {getUserProfile} from '../server/api/user/get.js';
import {DataContext} from '../context/contextFile.js';


function CreateAccount({ renderControl, setRenderControl}){

  
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [isAnotherAccount, setIsAnotherAccount] = React.useState(false);
  const {setLoggedIn, setId, operation,  setOperation} = React.useContext(DataContext);

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
  
  

  // const [alert, setAlert] = React.useState({})

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },


    // enableReinitialize: true,

    onSubmit: async (values) => {
      
      // alert("Successfully created user.");

      const newUserDB ={ 
      "Name": values.name, 
      "Email": values.email,
      "Password": values.password,
      "AccountNumber" : Math.round(Math.random()*100000),
      "AccountBalance": 0,
       };

      
      // clientAxios.post(`/login`, accessData)
      //   .then((response => console.log("in post", response)));
      
      
       const {PromiseResult} = sendNewUser(newUserDB);
       console.log(sendNewUser(newUserDB));
       console.log(PromiseResult);
       setNewUser(newUserDB);
       setOperation(operation + 1);
      //  setRenderC  ontrol(renderControl + 1);
      //To actualize users
      // setRenderControl(renderControl + 1);
      
    },

    validate: (values) => {
      let errors = {};
      //name validation
      if (!values.name || values.name.length<1){
        errors.name = "Field required";
      } else if(!/^[a-zA-Z0-9]/.test(values.name)){
        errors.name = "Only alphanumeric characters."
      }
      
      
      else if (values.name.length>0  & !values.name.match("^[A-Za-z]{1,20} [A-Za-z]{1,20}")) {
        errors.name = "Please use the format first-name laste-name (i.e.: Camilo Rincon)";
      } 


      
      //email validation
      if(initialized){
        if (!values.email || values.email.length<1) {
          errors.email = "Field required";
        } else if ( (users.filter(item => item.Email === values.email)).length === 1) {
          errors.email = "This email already exists.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
          errors.email = "This does not look like an email."
        }
      }

      //password validation
      if (!values.password || values.password.length<1) {
        errors.password = "Field required";
      } else if (values.password.length < 8 ){
        errors.password = "At least 8 characters";
      }


      return errors;
      
    },

  });

  const handleAnotherAccount = (e) => {
    
    e.preventDefault();
    console.log(isAnotherAccount);
    setIsAnotherAccount(false);
    console.log(false);
    formik.resetForm();
  };

  
  // const handleAccess = async (e) => {
    
  //   e.preventDefault();

  //   if(initialized ){
  //     let destinationUser = (users.filter(item => (item.Email) === (newUser.Email)))[0];
  //     console.log(destinationUser);
  //     if(destinationUser){

  //       setId(destinationUser._id);
  //       setLoggedIn(true);
  //       };
  //   }
  //     //To actualize context
  //     setOperation( operation + 1);
  //   };


  return (
    <Card
    txtcolor="black"
    header="Create Account"

    body={(

    <div>

    { (isAnotherAccount)&&(<button id="anotherAccount" type="button" onClick = {(e) => handleAnotherAccount(e)}>
          Add Another Account
        </button>)}
{/* 
    { (isAnotherAccount)&&(<button id="anotherAccount" type="button" onClick = {(e) => handleAccess(e)}>
          Access your account
        </button>)} */}

    { (!isAnotherAccount)&&(<Formik
    initialValues = {formik.initialValues}>

      <form onSubmit={formik.handleSubmit}>
        <div>Name:</div>
        <input
          id="nameField"
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <br />
        {(formik.errors.name) ? (
          <div id="nameError" style={{ color: "red" }}>
            {formik.errors.name}
          </div>
        ) : null}
        <div>Email:</div>
        <input
          id="emailField"
          type="text"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div id="emailError" style={{ color: "red" }}>
            {formik.errors.email}
          </div>
        ) : null}
        <div>Password:</div>
        <input
          id="pswField"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <br />
        {formik.errors.password ? (
          <div id="pswError" style={{ color: "red" }}>
            {formik.errors.password}
          </div>
        ) : null}

          {/* <button type='reset' >
          Reset </button> */}


        {(!isAnotherAccount)&&(<button id="submitBtn" type='submit' disable ={!formik.isValid && formik.isSubmitting } onClick = {() => {
          setIsAnotherAccount(true);
          formik.handleSubmit(formik.values);
        }
        }>
          Submit
        </button>)}

      </form>
        

    </Formik>)}

    </div>
      )}
    />
  );

}

export default CreateAccount;