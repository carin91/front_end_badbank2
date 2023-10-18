
import React from 'react';
import Card from './card.js';
import {DataContext} from '../context/contextFile.js';
// import ctx from 'api.js';

function Home(){
  const {user, loggedIn} = React.useContext(DataContext);
  
   var welcome = 'Welcome to the bank';
  if(loggedIn){
    var welcome =`${user.Name} welcome to the bank`;
  } 
  
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title= {welcome}
      text="You can move around using the navigation bar."
      body={(<img src="images/bank.png" className="img-fluid" alt="Responsive image"/>)}
      
    />    
    
  );  
}

export default Home;