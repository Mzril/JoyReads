import React from 'react';
import SessionPage from './sessions/session_page';
import Mainpage from "./mainpage";
import {Route, Switch} from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <header>
        <Switch>
          <Route exact path="/" component={SessionPage}/>
          <Route path="/" component={Mainpage}/>
        </Switch>
      </header>
    </div>
  );
};


export default App;
