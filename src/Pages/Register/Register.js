import React, { useEffect, useState } from 'react';
import { Form } from '../../components/Form/Form';
import './Register.css';
import { createUser } from '../../api/users/create';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    city: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [onRegister, setOnRegister] = useState(false);
  const [statusCode, setStatusCode] = useState({ code: '', message: '' });

  const checkPwd = profile.password === profile.passwordConfirm;

  useEffect(() => {
    if (statusCode.code === 201) {
      setOnRegister(true);
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => {
        clearTimeout(timer);
      };
    } else if (statusCode.code === 400) {
      setOnRegister(true);
      const timer = setTimeout(() => {
        setOnRegister(false);
        cancelForm();
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [statusCode]);

  const cancelForm = pwd => {
    if (!pwd) {
      setProfile(prev => ({
        ...prev,
        email: '',
        password: '',
        passwordConfirm: '',
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        password: '',
        passwordConfirm: '',
      }));
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!checkPwd) {
      return cancelForm(true);
    }
    delete profile.passwordConfirm;
    return createUser(profile).then(value =>
      setStatusCode(prev => ({
        ...prev,
        code: value.code,
        message: value.message,
      }))
    );
  };

  const formFields = [
    {
      id: 'name',
      name: 'lastName',
      label: 'Nom :',
      type: 'text',
      value: profile.lastName,
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
      value: profile.passwordConfirm,
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
      {onRegister ? (
        <div className="onRegister">
          <p>{statusCode.message}</p>
        </div>
      ) : (
        <div className="formBox">
          <Form
            label={true}
            formFields={formFields}
            onSubmit={handleSubmit}
            checkpassword={checkPwd}
            required={true}
          />
        </div>
      )}
    </div>
  );
}
