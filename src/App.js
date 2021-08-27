import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Loading from './containers/Loading/Loading';
import Main from './containers/Main/Main';
import FirstConfiguration from './containers/FirstConfiguration/FirstConfiguration';

import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/loading" component={Loading} />
        <Route path="/app" component={Main} />
        <Route path="/config" exact component={FirstConfiguration} />
      </Switch>
    </div>
  );
}

export default App;
