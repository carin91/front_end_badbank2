import React, { useState, useEffect } from 'react';
export const DataContext = React.createContext();
import {getAuthenticatedProfile } from '../server/api/user/get.js'
// import clientAxios from '../server/clientAxios'
// const getUserProfile = async () => await clientAxios.get(`/users`);

const dataFixed = {"users" : [ 
    { "_id":"652ce5ce7db050d54c3a4f76",
      "Name": "Jane Doe",
      "Email": "jane@me.com",
      "Password": "Access123",
      "AccountNumber" : 181,
      "AccountBalance": 1500,
      
        },
    { "_id":"652ce6847db050d54c3a4f78",
        "Name": "Peter Parker",
        "Email": "peter@mit.edu",
        "Password": "Passcode321",
        "AccountNumber" : 8497,
        "AccountBalance": 2000,
        
      },
    { "_id":"652b6890f2b1a2f85bb56f87",
        "Name": "John Smith",
        "Email": "john@msn.com",
        "Password": "Letmein33",
        "AccountNumber" : 64,
        "AccountBalance": 800,
        
      }]
    }

export const DataProvider = ({ children}) => {
    
    // const [id, setId] = useState("");
    const [user, setUser] = useState({});
    const [operation, setOperation] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [id, setId] = useState("");
    
    // setId("652b6890f2b1a2f85bb56f87");
    // useEffect(()=>{
    //   setUser(  { "_id":"652b6890f2b1a2f85bb56f87",
    //   "Name": "John Smith",
    //   "Email": "john@msn.com",
    //   "Password": "Letmein33",
    //   "AccountNumber" : 64,
    //   "AccountBalance": 2800,
      
    //   })
    // }, []);

    // setContacts(getUserProfile());
    useEffect(()=>{
      if(id.length > 0){
        const getContact = async () => {
          const contact = await getAuthenticatedProfile(id);
          if(contact) setUser(contact.data);
        };

        getContact();

      }
    }, [operation]);

//  React.useEffect(() => {
//   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
//  }, [contacts]);


    return(
        <DataContext.Provider value = {{user, setUser, operation, setOperation, id, setId, loggedIn, setLoggedIn }}>
            {children}
        </DataContext.Provider>
    )
}