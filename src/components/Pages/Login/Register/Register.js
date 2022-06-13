import React from 'react';
import './Register.css';
export function Register() {
  return (
    <div className="register">
      <h1>Créer un compte et commencer à partager vos produits</h1>
      <div className="formBox">
        <form>
          <label for="name">Nom</label>
          <input required type="text"></input>
          <label for="firstname">Prénom</label>
          <input required type="text"></input>
          <label for="city">Ville</label>
          <input required type="text"></input>
          <label for="email">Email</label>
          <input
            required
            type="email"
            pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$"
          ></input>
          <label for="city">Mot de passe</label>
          <input required type="text"></input>
          <label for="city">Confirmation de Mot passe</label>
          <input required type="text"></input>
          <input className="button" type="submit" value="S'enregistrer"></input>
        </form>
      </div>
    </div>
  );
}
