import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import * as Routes from './constants/routes';

// componentes
import Menu from './pages/Menu';
import Login from './pages/Login';
import Recovery from './pages/Recovery';

import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.RECOVERY_PASSWORD} render={Recovery} />
        <Route exact path={Routes.LOGIN} component={Login} />
        <Route path={Routes.MENU} component={Menu} />
      </Switch>
    </Router>
  );
}
