import React, { useState } from 'react';
import { Form } from '../../components/Form/Form';
import './Register.css';

export function Register() {
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    city: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(profile);
  };

  const formFields = [
    {
      id: 'name',
      name: 'lastName',
      label: 'Nom :',
      type: 'text',
      value: profile.name,
      onChange: handleChange,
    },
    {
      id: 'firstName',
      name: 'firstName',
      label: 'Prénom :',
      type: 'text',
      value: profile.firstName,
      onChange: handleChange,
    },
    {
      id: 'city',
      name: 'city',
      label: 'Ville :',
      type: 'text',
      value: profile.city,
      onChange: handleChange,
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email :',
      type: 'email',
      value: profile.email,
      pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]{2,3}$',
      onChange: handleChange,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Mot de Passe :',
      type: 'password',
      value: profile.password,
      onChange: handleChange,
    },
    {
      id: 'passwordConfirm',
      name: 'passwordConfirm',
      label: 'Confirmation de Mot de Passe :',
      type: 'password',
      onChange: handleChange,
    },
    {
      type: 'submit',
      value: "S'enregistrer",
    },
  ];

  return (
    <div className="register">
      <h1>Créer un compte et commencer à partager vos produits</h1>
      <div className="formBox">
        <Form label={true} formFields={formFields} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
