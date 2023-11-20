//mport React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/home/Home';
import NewDog from './components/NewDog/NewDog';
import Details from './components/Details/Details';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Switch permite renderizar solo la primera ruta que coincida */}
      <Switch>
        {/* Ruta para la página de inicio */}
        <Route exact path="/" component={LandingPage} />
        
        {/* Ruta para la página principal */}
        <Route exact path="/home" component={Home} />
        
        {/* Ruta para la creación de un nuevo perro */}
        <Route exact path="/new" component={NewDog} />
        
        {/* Ruta para ver detalles de un perro específico */}
        <Route exact path="/home/:id" component={Details} />
      </Switch>
    </div>
  );
}

export default App;