// //commons imports
// import  { useState, useEffect } from 'react';
// import axios from 'axios';

// //components
// import LandingPage from './components/LandingPage/LandingPage';
// import Home from './components/home/Home';
// import NewDog from './components/NewDog/NewDog';
// import Details from './components/Details/Details';
// import NavBar from './components/NavBar/NavBar.jsx';
// import About from "./components/About/About.jsx";
// import Form from "./components/Form/Form.jsx";

// //Router-Dom
// import { Route, Routes, useLocation, useNavigate, Switch } from 'react-router-dom';
// import Detail from "./components/Detail/Detail.jsx";

// import PATHROUTES from ".//helpers/pathRoutes.helper.js";

// //styles
// import styles from './App.css';


// function App() {
//   return (
//     <div className="App">
//       {/* Switch permite renderizar solo la primera ruta que coincida */}
//       <Switch>
//         {/* Ruta para la página de inicio */}
//         <Route exact path="/" component={LandingPage} />
        
//         {/* Ruta para la página principal */}
//         <Route exact path="/home" component={Home} />
        
//         {/* Ruta para la creación de un nuevo perro */}
//         <Route exact path="/new" component={NewDog} />
        
//         {/* Ruta para ver detalles de un perro específico */}
//         <Route exact path="/home/:id" component={Details} />
//       </Switch>
//     </div>
//   );
// }

// function App() {
//   const [characters, setCharacters]=useState([]);
//   const {pathname} = useLocation();
//   const navigate = useNavigate();
//   const [access, ] = useState(false);

//     useEffect(() => {
//     !access && navigate('/');
//     }, [access, navigate]);


   
//   const onSearch = async (id) => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/dogs/character/${id}`)
//         if (data.name) {
//             //setCharacters((oldChars) => [...oldChars, data]);
//             setCharacters([...characters, data]);
//         } 
//     } catch (error) {
//          window.alert('¡No se a asignado el id!');
//       }
//   }

//   const onClose = (id) => {
//     setCharacters(characters.filter((char) => {
//       return char.id !== (id)
//     })
//     )
//   }

//   return (
//     <><div className="App">
//       {/* Switch permite renderizar solo la primera ruta que coincida */}
//       <Switch>
//         {/* Ruta para la página de inicio */}
//         <Route exact path="/" component={LandingPage} />

//         {/* Ruta para la página principal */}
//         <Route exact path="/home" component={Home} />

//         {/* Ruta para la creación de un nuevo perro */}
//         <Route exact path="/new" component={NewDog} />

//         {/* Ruta para ver detalles de un perro específico */}
//         <Route exact path="/home/:id" component={Details} />
//       </Switch>
//     </div>
//     <><div className={styles.active}></div>
//         <div className='App'>
//           {pathname !== '/' && <NavBar onSearch={onSearch} />}

//           <Routes>

//             <Route path={PATHROUTES.LANDINGPAGE} element={<Form landingpage={landingpage} />} />
//             <Route path={PATHROUTES.HOME} element={<Home characters={characters} onClose={onClose} />} />
//             <Route path={PATHROUTES.ABOUT} element={<About />} />
//             <Route path={PATHROUTES.DETAIL} element={<Detail onClose={onClose} />} />



//           </Routes>

//         </div></></>
//    );
// }

//  export default App;


//import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './/components/LandingPage/LandingPage';
import Home from './/components/home/Home';
import About from './/components/About/about';
import NewDog from './/components/NewDog/NewDog';
import Filtros from './components/home/Filter/Filtros';
import FiltroTemperamento from './components/home/Filter/FiltroTemperamento';
import SearchBar from './components/Header/SearchBar/SearchBar';
import Details from './/components/Details/Details';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {  getDogs, getTemperament } from './Redux/actions/actions';

function App() {
  const dispatch = useDispatch();
  //let location = useLocation();

  // Despues de que el componente esta cargado se realiza un dispath para  mostrar los primeros perros
  useEffect(() => {
    dispatch( getDogs());
    dispatch(getTemperament());
  }, [dispatch]);
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/new" component={NewDog} />
        <Route exact path="/searchBar" component={SearchBar} />
        <Route exact path="/filtro" component={Filtros} />
        <Route exact path="/filtrotemperamento" component={FiltroTemperamento} />
        <Route exact path="/home/:id" component={Details} />
      </Switch>
    </div>
  );
}

export default App;