import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import routes from './routes.js'
import { HashRouter as Router } from 'react-router-dom';

// import { NavBar } from './cmps/NavBar'


function App() {
  return (
    <div className="App">
      <Router>
        {/* <NavBar /> */}
        <Switch>
        <p>hqy!@#!@#!@#!#</p>
          {/* {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)} */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
