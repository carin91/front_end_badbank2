

import React, {useState, useEffect} from "react";
import Card from './card.js';
import {DataContext} from '../context/contextFile.js';
import {putUser} from '../server/api/user/put.js';
import {getUserProfile} from '../server/api/user/get.js'


const ATMTransfer = ({ onChangeTransfer, onChangeAccount, isValid, transferError, destinationAccountError, destinationAccountMsg }) => {
  return (
    <div className="WithdrawForm">
      <label className="label huge">
        <div>
            <label> TRANSFER AMOUNT</label>
            <input id="number-input" type="text" width="200" onChange={onChangeTransfer}></input>
            <span style ={{ color: 'red'}}> {transferError}</span>
        </div>

        <div>
            <label> DESTINATION ACCOUNT</label>
            <input id="number-input" type="text" width="200" onChange={onChangeAccount}></input>
            <span style ={{ color: 'red'}}> {destinationAccountError}</span>
            <span style ={{ color: 'green'}}> {destinationAccountMsg}</span>
        </div>

        <input type="submit" disabled={!isValid} width="200" value="TRANSFER" id="submit-input"></input>

      </label>
    </div>

  );
};

const Transfer = ({users, init, renderControl, setRenderControl}) => {
  const {user} = React.useContext(DataContext);
  const {operation, setOperation} = React.useContext(DataContext);
  
  const [contacts, setContacts] = useState([]);
  const [initialized, setInitialized] = useState(false)
  // const {contacts, setContacts} = React.useContext(DataContext);

  const [transfer, setTransfer] = React.useState(0);
  const [destinationAccount, setDestinationAccount] = React.useState(null);
  const [transferError, setTransferError] = React.useState(null);
  const [totalState, setTotalState] = React.useState(Number(user.AccountBalance));
  const [validTransactionValue, setValidTransactionValue] = React.useState(false);
  const [validDestinationAccount, setValidDestinationAccount] = React.useState(false);
  const [destinationAccountError, setDestinationAccountError] = React.useState(null);
  const [destinationAccountMsg, setdestinationAccountMsg] = React.useState(null);

  useEffect(() => {
    if (users) {
      setContacts(users)
    }
  }, []);

  useEffect(() => {
    if (init) {
      setInitialized(init)
    }
  }, []);


  let status = `$${totalState} `;

  const handleTransferChange = (event) => {
    
    if(isNaN(Number(event.target.value))){
      setTransferError(`Enter numerical values only.`);
      } else{
        if (Number(event.target.value) <= 0 || Number(event.target.value)> totalState) {
          setTransferError(`Transaction failed. You cannot transfer more than your balance.`);
          return setValidTransactionValue(false);
        } else {
          setValidTransactionValue(true);
        }
        setTransfer(Number(event.target.value));
    };
  };


  const handleAccountChange = (event) => {
    if(initialized ){
      let destinationUser = (contacts.filter(item => Number(item.AccountNumber) === Number(event.target.value)))[0];
      console.log(destinationUser);
      if((contacts.filter(item => Number(item.AccountNumber) === Number(event.target.value))).length){
        setValidDestinationAccount(true);
        setdestinationAccountMsg(`You will transfer to the destination account number ${event.target.value} releated to ${destinationUser.Email}`);
        setDestinationAccountError(null);
        setDestinationAccount(event.target.value);
        } else{
          setDestinationAccountError('This account does not exist.');
          setdestinationAccountMsg(null);
      };
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(initialized ){
      let newTotal =  Number(user.AccountBalance) - Number(transfer);
      let destinationUser = (contacts.filter(item => Number(item.AccountNumber) === Number(destinationAccount)))[0];
      // console.log(destinationUser);
      let newDestinationTotal =  Number(destinationUser.AccountBalance) + Number(transfer);
      setTotalState(newTotal);
      let newData = {...contacts};
      let id_destination = 0;
      contacts.map( (item,index) => {
        if(Number(item.AccountNumber) === Number(destinationAccount)){
          newData[index].AccountBalance = newDestinationTotal;
          // console.log(index);
          // let id_destination = contacts.data[index]._id;
          id_destination = (newData[index]._id);
          console.log(id_destination);
          // console.log(id_destination)
          console.log(newData[index], 'pondre el destino aqui')
          
          setRenderControl(renderControl + 1);
            putUser(id_destination, newData[index]);
        }
    
    })

    let newUser = {...user};
    newUser.AccountBalance = newTotal; 
    
    setRenderControl(renderControl + 1);
    setOperation(operation + 1);
       putUser(user._id, newUser);
    setValidTransactionValue(false);
    
    alert(`Successful transaction, you transfer $${transfer} from your account to ${destinationUser.Email}. Your account balance is $${newTotal}.`);
    
    // console.log(id_destination);
    }
  };


  return (
    <Card
    txtcolor="black"
    header="Withdraw"
    body={(

    <div>

      <div className="transaction">
                 <th scope="col">Balance: </th>
                 <th scope="col" id="total">{status}</th>
      </div>
       {<form onSubmit={handleSubmit}>
      
              {
                <ATMTransfer
                  onChangeTransfer={handleTransferChange}
                  onChangeAccount={handleAccountChange}
                  isValid={validTransactionValue && validDestinationAccount}
                  transferError={transferError}
                  destinationAccountError={destinationAccountError}
                  destinationAccountMsg={destinationAccountMsg}
                ></ATMTransfer>
              }
      
          </form>}
      </div>

    )}
    
  />  

  );
};

export default Transfer;
