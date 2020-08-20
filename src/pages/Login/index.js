import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import context from '../../context';

import './login.css';

export default function Login() {
  const history = useHistory();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [isRegister, setIsRegister] = React.useState(false);

  const { firebase } = React.useContext(context);

  function handleLoginType() {
    setIsRegister(!isRegister);
  }

  function handleAuthentication(data) {
    localStorage.setItem('auth', JSON.stringify(data));
    history.push('/lunch');
  }

  function handleLogin(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => handleAuthentication(response))
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          setError('Tus credenciales no son válidas');
          setTimeout(() => setError(null), 3000);
        }
      });
  }

  function handleRegister(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // se agrega el nomnbre al perfil de usuario
        firebase
          .auth()
          .currentUser.updateProfile({ displayName: name })
          .then(() => handleAuthentication(response))
          .catch(error => console.error(error));
      })
      .catch(function (error) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          setError('Tu email ya se encuentra en uso');
          setTimeout(() => setError(null), 3000);
        }
      });
  }

  return (
    <div className="login">
      <div className="login-content shadow">
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <h1 className="black title">Inicia Sesión</h1>
            <span className="subtile white">usa tu email</span>
            <input
              type="email"
              className="input"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Link to="/recovery-password" className="link">
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="error">{error}</p>
            <button className="button">Iniciar sesión</button>
          </form>
        </div>
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <h1 className="title">Crea tu Cuenta</h1>
            <input
              type="text"
              className="input"
              placeholder="Nombre"
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <p className="error">{error}</p>
            <button type="submit" className="button">
              REGISTRAR
            </button>
          </form>
        </div>
        <div
          className={`overlay-container ${(isRegister && 'left') || 'right'}`}
        >
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">¡Bienvenido!</h1>
              <p className="subtitle">Inicia sesión con tu cuenta</p>
              <button id="signIn" className="button" onClick={handleLoginType}>
                Inicia sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">¡Hola!</h1>
              <p className="subtitle white">Crea tu cuenta</p>
              <button id="signUp" className="button" onClick={handleLoginType}>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
