import React from 'react';
import SessionPage from './sessions/session_page';
import Navbar from "./navbar";
import {Route, Switch} from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>IT'S (A)LIVE!!</h1>
        <Switch>
          <Route exact path="/" component={SessionPage}/>
          <Route path="/" component={Navbar}/>
        </Switch>
      </header>
    </div>
  );
};


export default App;
