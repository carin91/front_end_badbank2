

import React from "react";
import Card from './card.js';
import {DataContext} from '../context/contextFile.js';
import { putUser } from "../server/api/user/put.js";

const ATMDeposit = ({ onChange, isValid, depositError }) => {
  return (
    <div className="DepositForm">
      <label className="label huge">
        <div>
          <label> DEPOSIT AMOUNT</label>
          <input id="number-input" type="text" width="200" onChange={onChange}></input>
          <span style ={{ color: 'red'}}> {depositError}</span>
        </div>
        <input type="submit" disabled={!isValid} width="200" value="DEPOSIT" id="submit-input"></input>
      </label>
    </div>

  );
};

const Deposit = () => {
  const {user, setUser} = React.useContext(DataContext);
  const {operation, setOperation} = React.useContext(DataContext);
  
  const [totalState, setTotalState] = React.useState(Number(user.AccountBalance));
  const [deposit, setDeposit] = React.useState(0);
  const [depositError, setDepositError] = React.useState(null);
  const [validTransaction, setValidTransaction] = React.useState(false);
  
  

  let status = `$ ${totalState} `;

  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if(isNaN(Number(event.target.value))){
      setDepositError(`Enter numerical values only.`);
    } else{
        if (Number(event.target.value) <= 0) {
          setDepositError(`Enter positive numbers only.`);
          return setValidTransaction(false);
        } else {
          setDepositError('');
          setValidTransaction(true);
        }
        setDeposit(Number(event.target.value));
    }
    

  };

  const handleSubmit = (event) => {
    let newTotal =  Number(user.AccountBalance) + Number(deposit);
    setTotalState(newTotal);
    let newUser = {...user};
    newUser.AccountBalance = newTotal;
    // setData(newData);
    // setUser(newUser);
    setOperation(operation + 1);
    putUser(user._id, newUser);
    
    setValidTransaction(false);
    event.preventDefault();
    alert(`Successful transaction, you deposit $${deposit} in your account. Your account balance is $${newTotal}.`);
    
  };


  return (
    <Card
      txtcolor="black"
      header="Deposit"
      body={(

      <div>

        <div className="transaction">
                  <th scope="col">Balance: </th>
                  <th scope="col" id="total">{status}</th>
        </div>
        {<form onSubmit={handleSubmit}>
        
                {
                  <ATMDeposit
                    onChange={handleChange}
                    isValid={validTransaction}
                    depositError={depositError}
                  ></ATMDeposit>
                }
        
            </form>}
            
            
        </div>

      )}
      
    />  
  );
};

export default Deposit;