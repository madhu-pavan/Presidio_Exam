import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/seller" component={Seller} />
          <Route path="/buyer" component={Buyer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
