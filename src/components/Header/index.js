import React from 'react';
import { useHistory } from 'react-router-dom';
import context from '../../context';
import './header.css';

export default function Header() {
  const { user } = JSON.parse(localStorage.auth);
  const { firebase } = React.useContext(context);
  const history = useHistory();

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('auth');
        history.push('/login');
      })
      .catch(error => {
        localStorage.removeItem('auth');
        history.push('/login');
        console.error(error);
      });
  }

  return (
    <header className="header bg-white shadow">
      <div className="header-container">
        <span className="app-name font-luckiest yellow">Burger Queen</span>
        <div className="waiter-name">{user.displayName || 'Mesero'}</div>
        <button className="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
