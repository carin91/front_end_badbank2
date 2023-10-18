
import React, {useState, useEffect} from 'react'
import NavBar from './components/navbar.js'
import Home from './components/home.js'
import CreateAccount from './components/createaccount.js'
import Deposit from './components/deposit.js'
import AllData from './components/alldata.js'
import './app.css'
import Withdraw from './components/withdraw.js'
import Transfer from './components/transfer.js'
import { Route, Switch, Link} from 'react-router-dom'
// import DataContext from './components/context.js';
import { DataProvider} from './context/contextFile.js'
import  Login  from "./components/login.js"
import { AuthProvider } from './context/AuthProvider'
import {getUserProfile} from './server/api/user/get.js'
import  {deleteUser}  from './server/api/user/delete.js'


const App = () => {
    // const [newUsers, setNewUsers] = React.useState([]);
    const [users, setUsers] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [renderControl, setRenderControl] = useState(0);
    

    //  useEffect(()=>{
    //     const getAllContacts = async () => {
    //       const allContacts = await getUserProfile();
    //       console.log('estoy dentro de useEffect', allContacts);
    //       if(allContacts) {

    //         setUsers(allContacts);
    //         setInitialized(true);
    //       }
    //     };
    
    //     setTimeout(() => getAllContacts(), 500);
        
    //   }, []);

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

    useEffect(()=>{
        getAllContacts();
     }, [renderControl]);


    const removeContactHandler = (id) => {
        deleteUser(id);
        const newContactList = users.filter((user) => {
        return user.id !== id;
        });
        
        setUsers(newContactList);
     };



    
    return(
    <div className='container'>
        {/* <AuthProvider> */}
            <DataProvider>
            <div>
                    <NavBar
                    />

            </div>

                        <main className='main'>
                            <Switch>
                                <Route exact path='/' component={ () =>{
                                   return(
                                    <Home
                                   
                                    /> ) 
                                    
                                }}/>

                                <Route exact path='/CreateAccount' component= { () =>{
                                return(
                                    <CreateAccount
                                     init = {initialized}
                                     renderControl = {renderControl}
                                     setRenderControl = {setRenderControl}
                                    />)
                                }   }/>

                                <Route exact path='/deposit' component= { () =>{
                                return(
                                    <Deposit 

                                    />)
                                }   }/>

                                <Route exact path='/login' component= { () =>{
                                return(
                                    <Login 
                                    
                                    />)
                                }   }/>

                                <Route exact path='/withdraw' component= { () =>{
                                return(
                                    <Withdraw 
                                    />)
                                }   }/>

                                
                                <Route exact path='/transfer' component= { () =>{
                                return(
                                    <Transfer 
                                    users = {users}
                                    init = {initialized}
                                    renderControl = {renderControl}
                                    setRenderControl = {setRenderControl}
                                    />)
                                }   }/>

                                <Route exact path='/alldata' component= { () =>{
                                return(
                                    <AllData
                                    users = {users}
                                    init = {initialized}
                                    removeContactHandler = {removeContactHandler}
                                    renderControl = {renderControl}
                                    setRenderControl = {setRenderControl}
                                    
                                    />)
                                }   }/>
                                

                            </Switch>
                        </main>
            </DataProvider>
        {/* </AuthProvider> */}
    </div>
    )
}

export default App;


