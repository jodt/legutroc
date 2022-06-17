import './Login.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../api/auth/auth';
import { Form } from '../../components/Form/Form';

export function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };
  const handleSubmit = event => {
    if (auth(email, password)) {
      props.onlogin(true);
      navigate('dashboard');
    }
  };

  const formFields = [
    {
      type: 'email',
      placeholder: 'Email',
      pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]{2,3}$',
      onChange: handleChangeEmail,
    },
    {
      type: 'password',
      placeholder: 'Mot de Passe',
      onChange: handleChangePassword,
    },
    {
      type: 'submit',
      value: 'Se connecter',
    },
  ];

  return (
    <div className="loginPage">
      <div className="loginHeader">
        <h1>LEGU'TROC</h1>
      </div>
      <div className="login">
        <Form onSubmit={handleSubmit} label={false} formFields={formFields} />
        <Link to="/register" className="registerLink">
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
