import React, { useContext } from 'react';
import './MyAccount.css';
import { UserContext } from '../../contexts/userContext';

export function MyAccount() {
  const user = useContext(UserContext);
  const { name } = user;
  return (
    <div className="myaccount">
      <h1> Mes infos</h1>
      <div className="formBox">
        <div className="userInfos">
          <p>
            <span>Nom: </span>
            {user.lastName}
          </p>

          <p>
            <span>Prénom: </span>
            {user.firstName}
          </p>

          <p>
            <span>Ville: </span>
            {user.city}
          </p>
        </div>
      </div>
    </div>
  );
}
