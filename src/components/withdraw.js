

import React from "react"
import Card from './card.js'
import {DataContext} from '../context/contextFile.js'
import {putUser} from '../server/api/user/put.js';


const ATMWithdraw = ({ onChange, isValid, withdrawError }) => {
  return (
    <div className="WithdrawForm">
      <label className="label huge">
        <div>
          <label> WITHDRAW AMOUNT</label>
          <input id="number-input" type="text" width="200" onChange={onChange}></input>
          <span style ={{ color: 'red'}}> {withdrawError}</span>
        </div>

        <input className="btn btn-light"  type="submit" disabled={!isValid} width="200" value="WITHDRAW" id="submit-input"></input>

      </label>
    </div>

  );
};

const Withdraw = () => {
  const {user, setUser} = React.useContext(DataContext);
  const {operation, setOperation} = React.useContext(DataContext);

  const [withdraw, setWithdraw] = React.useState(0);
  const [withdrawError, setWithdrawrError] = React.useState(null);
  const [totalState, setTotalState] = React.useState(Number(user.AccountBalance));
  const [validTransaction, setValidTransaction] = React.useState(false);


  let status = `$ ${totalState} `;

  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if(isNaN(Number(event.target.value))){
      setWithdrawrError(`Enter numerical values only.`);
      } else{
        if (Number(event.target.value) <= 0 || Number(event.target.value)> totalState) {
          setWithdrawrError(`Transaction failed, withdraw amount is too high.`);
          return setValidTransaction(false);
        } else {
          setWithdrawrError('');
          setValidTransaction(true);
        }
        setWithdraw(Number(event.target.value));
    };
  };

  const handleSubmit = (event) => {
    let newTotal =  Number(user.AccountBalance) - Number(withdraw);
    setTotalState(newTotal);
    let newUser = {...user};
    newUser.AccountBalance = newTotal;
    // setUser(newUser);
    putUser(user._id, newUser);
    setOperation(operation + 1);

    setValidTransaction(false);
    event.preventDefault();
    alert(`Successful transaction, you withdraw $${withdraw} from your account. Your account balance is $${newTotal}.`);
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
                <ATMWithdraw
                  onChange={handleChange}
                  isValid={validTransaction}
                  withdrawError={withdrawError}
                ></ATMWithdraw>
              }
      
          </form>}
      </div>

    )}
    
  />  

  );
};

export default Withdraw;
