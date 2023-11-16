import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import NewDog from './Components/NewDog/NewDog';
import Details from './Components/Details/Details';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/new" component={NewDog} />
        <Route exact path="/home/:id" component={Details} />
      </Switch>
    </div>
  );
}

export default App;