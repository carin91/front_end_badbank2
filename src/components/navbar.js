
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {DataContext} from '../context/contextFile.js';



function NavBar(){
  const {user, loggedIn, setLoggedIn, setId} = React.useContext(DataContext);
  // // let userName =`${data.name}`;
  let userName =`${user.Name}`;
  // let userName = 'Camilo';


  return(
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">BadBank</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> 
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {!loggedIn && (<li className="nav-item">
            <Link className="nav-link" to="/CreateAccount">Create Account</Link>
          </li>)}

          {!loggedIn && (<li className="nav-item">
            <Link className="nav-link" to="/alldata">All data</Link>
          </li>)}

          {!loggedIn && (<li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>)}

          {loggedIn && (<li className="nav-item">
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {userName}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/deposit">Deposit</Link>
                   <Link className="dropdown-item" to="/withdraw">Withdraw</Link>
                   <Link className="dropdown-item" to="/transfer">Transfer</Link>
                    <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/" onClick={ (e) => { 
                      setLoggedIn(false);
                      setId("");
                    }}>Sign Out</Link>
               </div>

              </div>
            </li>)}
             
        </ul>
      </div>
    </nav>
    
  );
}

export default NavBar;