import './Login.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../../api/auth/auth';

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

  return (
    <div className="loginPage">
      <div className="loginHeader">
        <h1>LEGU'TROC</h1>
      </div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$"
            onChange={handleChangeEmail}
          ></input>
          <input
            type="password"
            required
            placeholder="Mot de passe"
            onChange={handleChangePassword}
          ></input>
          <input className="button" type="submit" value="Se connecter"></input>
        </form>
        <Link to="/register" className="registerLink">
          Créer un compte
        </Link>
      </div>
    </div>
  );
}

/*export class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
    }
    this.handleChangeEmail= this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }
  handleChangeEmail(e)
  {
    this.setState({email : e.target.value})
  }
  handleChangePassword(e)
  {
    this.setState({password : e.target.value})
  }

  render() {
    return (
      <div className='LoginPage'>
        <div className='LoginHeader'>
          <h1>LEGU'TROC</h1>
        </div>
        <div className='Login'>
          <form onSubmit>
            <input
              type='email'
              required
              placeholder='Email'
              pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$'
              onChange={this.handleChangeEmail}
            ></input>
            <input
              type='password'
              required
              placeholder='Password'
              onChange={this.handleChangePassword}
            ></input>
            <input className="button" type="submit" value="Sign in"></input>
          </form>
        </div>
      </div>
    );
  }
}*/
