import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../api/auth/auth';
import { Form } from '../../components/Form/Form';

export function Login({ onlogin, userPropriety }) {
  const navigate = useNavigate();

  const [userInfos, setUserInfos] = useState('');
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    if (userProfile) {
      onlogin(true);
      userPropriety(userProfile);
      navigate('dashboard');
    }
  }, [userProfile, navigate]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfos(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const user = await auth(userInfos);
    setUserProfile(user);
  };

  const formFields = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,3}$',
      onChange: handleChange,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Mot de Passe',
      onChange: handleChange,
    },
    {
      type: 'submit',
      value: 'Se connecter',
    },
  ];

  return (
    <div className="loginPage">
      <div className="loginHeader">
        <h1>Légu'Troc</h1>
      </div>
      <div className="login">
        <Form
          onSubmit={handleSubmit}
          label={false}
          formFields={formFields}
          required={true}
        />
        <Link to="/register" className="registerLink">
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
