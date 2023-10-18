
import React, {useEffect, useState} from 'react';
// import {DataContext} from '../context/contextFile.js';
import { deleteUser } from '../server/api/user/delete.js';
import {getUserProfile} from '../server/api/user/get.js';
// import clientAxios from '../server/clientAxios'


// async function getUser() {
//   try {
//     const response = await clientAxios.get('/users', {});
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
//Component
function AllData({renderControl, setRenderControl}){

  
  const [users, setUsers] = useState([]);
  const [initialized, setInitialized] = useState(false);
  var [counter, setCounter] = useState(0);

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
  }, [counter]);

  useEffect(()=>{
  }, [users]);

  // useEffect(() => {
  //     console.log(contacts);
  // }, [contacts]);

  // const usersBadBank = JSON.parse(newUsers);
  const handleDelete = async (e, id) =>{


      deleteUser(id);
      setCounter(counter + 1);
      setRenderControl(renderControl + 1);
      // const newContactList = users.filter((user) => {
      // return user.id !== id;
      // });
      
      // setUsers(newContactList);
    
    // e.preventDefault();
    // try {
    //   const {dataDelete} = await deleteUser(id);
    //   setWarning({
    //       msg: dataDelete.msg,
    //       error: false
    //   })
      
    //   } catch (error) {
    //     setWarning({
    //           msg: error.response.dataDelete.msg,
    //           error: true
    //       })
    //     // console.log(getUserProfile().then());
    //   }
  }
  
  return (
    
    <div className='tableAllData'>
      <h2>All Data</h2>
      <table className="table">
        <thead>
        <tr>

      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Account Balance</th>
      <th scope="col">Account Number</th>
      <th scope="col">Delete</th>
      {console.log('estoy en el form', users)}
      
    </tr>
        </thead>
        <tbody>
        { (initialized) && (  
              users.map(user =>  
              <tr>
                <td scope="col">{user.Name}</td>
                <td scope="col">{user.Email}</td>
                <td scope="col">{user.Password}</td>
                <td scope="col">{user.AccountBalance}</td>
                <td scope="col">{user.AccountNumber}</td>
                
                <td scope="col" >
                  <div  className="pointer1" onClick = {(e) => handleDelete(e, user._id)}>
                    X 
                  </div>
                  </td>

               </tr>)
            )
             
          }
        </tbody>

      </table>

    </div>
  );
}

export default AllData;